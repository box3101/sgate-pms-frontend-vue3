<template>
  <div class="ui-attachment">
    <div class="attachment-section">
      <div class="section-header flex items-center gap-5">
        <Icon :name="icon" size="24" class="section-icon" />
        <span class="section-title">{{ title }}</span>
        <!-- 이미지 개수 표시 -->
        <span v-if="hasImages" class="image-count-badge"> 이미지 {{ imageFiles.length }}개 </span>
      </div>
      <div class="section-content">
        <div
          class="attachment-container"
          @dragenter.prevent="onDragEnter"
          @dragleave.prevent="onDragLeave"
          @dragover.prevent="onDragOver"
          @drop.prevent="onDrop"
        >
          <div class="attachment-content" :class="{ 'drag-over': isDragging }">
            <!-- 파일 업로드 영역 -->
            <div class="file-upload-container">
              <label for="file-upload" class="file-upload-label">
                <Icon name="mdi:plus-circle-outline" size="24" />
                <span>클릭하거나 드래그해서 파일을 추가하세요.</span>
              </label>
              <input
                id="file-upload"
                type="file"
                class="file-upload-input"
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.hwp,.txt,.zip,.7z,.rar"
                @change="handleFileUpload"
              />
            </div>

            <!-- 파일이 없을 때 정보 표시 -->
            <div class="file-info" v-if="modelValue.length === 0">
              <div class="file-info-text">
                <Icon name="mdi:file-outline" size="24" class="file-icon" />
                <span>파일 개수 : 0 / 5　　Total Size : 0 / 52,428,800 bytes</span>
              </div>
              <div class="file-formats">
                <span
                  >첨부 허용 확장자 :
                  jpg,jpeg,gif,png,bmp,txt,pdf,xls,xlsx,ppt,pptx,doc,docx,hwp,zip,7z,rar,alz,hwpx,heic,avi,mp4</span
                >
              </div>
            </div>

            <!-- 업로드된 파일이 있을 때 -->
            <div v-if="modelValue.length > 0">
              <!-- 파일 정보 표시 -->
              <div class="file-info-text">
                <span
                  >파일 개수 : {{ modelValue.length }} / 5　　Total Size : {{ totalSize }} /
                  52,428,800 bytes</span
                >
              </div>

              <!-- 이미지 미리보기 영역 (이미지만 표시) -->
              <div v-if="hasImages" class="image-preview-section">
                <div class="preview-header">
                  <h4 class="preview-title">📷 업로드한 이미지</h4>
                  <button v-if="modelValue.length > 0" @click="clearAllFiles" class="clear-all-btn">
                    <Icon name="mdi:delete-sweep" size="16" />
                    전체 삭제
                  </button>
                </div>
                <div class="image-preview-grid">
                  <div
                    v-for="(file, index) in imageFiles"
                    :key="`preview-${index}`"
                    class="image-preview-item"
                  >
                    <img
                      :src="createImageUrl(file.file)"
                      :alt="file.file.name"
                      class="preview-image"
                      @error="handleImageError"
                      @load="handleImageLoad"
                    />
                    <div class="image-overlay">
                      <button class="image-delete-btn" @click="removeFile(file.originalIndex)">
                        <Icon name="mdi:close" size="18" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 이미지가 아닌 파일들만 리스트로 표시 (옵션) -->
              <div v-if="nonImageFiles.length > 0" class="non-image-files">
                <div
                  v-for="(file, index) in nonImageFiles"
                  :key="index"
                  class="uploaded-file-item mt-10"
                >
                  <div class="file-info-section">
                    <Icon :name="getFileIcon(file.file)" size="20" class="file-type-icon" />
                    <span class="file-name">{{ file.file.name }}</span>
                    <span class="file-size">({{ formatFileSize(file.file.size) }})</span>
                  </div>
                  <button class="file-delete-btn" @click="removeFile(file.originalIndex)">
                    <Icon name="mdi:close" size="16" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onBeforeUnmount, watch, nextTick } from 'vue'

  /**
   * UiAttachment 컴포넌트 (이미지 중심 미리보기)
   */
  const props = defineProps({
    title: {
      type: String,
      default: '파일첨부'
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    icon: {
      type: String,
      default: 'mdi:paperclip'
    },
    // 이미지가 아닌 파일도 표시할지 여부
    showNonImageFiles: {
      type: Boolean,
      default: true
    }
  })

  const emit = defineEmits(['update:modelValue', 'file-added', 'file-removed', 'files-cleared'])

  // 상태 관리
  const isDragging = ref(false)
  const dragCounter = ref(0)
  const imageUrls = ref(new Map())

  // 이미지 파일 필터링
  const imageFiles = computed(() => {
    return props.modelValue
      .map((file, index) => ({ file, originalIndex: index }))
      .filter(({ file }) => isImageFile(file))
  })

  // 이미지가 아닌 파일들 필터링
  const nonImageFiles = computed(() => {
    return props.modelValue
      .map((file, index) => ({ file, originalIndex: index }))
      .filter(({ file }) => !isImageFile(file))
  })

  // 이미지 파일이 있는지 확인
  const hasImages = computed(() => {
    return imageFiles.value.length > 0
  })

  // 총 파일 크기 계산
  const totalSize = computed(() => {
    const size = props.modelValue.reduce((acc, file) => acc + file.size, 0)
    return size.toLocaleString()
  })

  /**
   * 파일이 이미지인지 확인
   * @param {File} file - 확인할 파일
   * @returns {boolean} 이미지 파일 여부
   */
  function isImageFile(file) {
    return file.type.startsWith('image/')
  }

  /**
   * 파일 타입에 따른 아이콘 반환
   * @param {File} file - 파일 객체
   * @returns {string} 아이콘 이름
   */
  function getFileIcon(file) {
    if (file.type.startsWith('image/')) return 'mdi:image'
    if (file.type.startsWith('video/')) return 'mdi:video'
    if (file.type.includes('pdf')) return 'mdi:file-pdf-box'
    if (file.type.includes('excel') || file.type.includes('spreadsheet')) return 'mdi:file-excel'
    if (file.type.includes('word') || file.type.includes('document')) return 'mdi:file-word'
    if (file.type.includes('powerpoint') || file.type.includes('presentation'))
      return 'mdi:file-powerpoint'
    if (file.type.includes('zip') || file.type.includes('rar') || file.type.includes('7z'))
      return 'mdi:archive'
    return 'mdi:file'
  }

  /**
   * 파일 크기 포맷팅
   * @param {number} bytes - 바이트 단위 크기
   * @returns {string} 포맷된 크기
   */
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  /**
   * 이미지 URL 생성 및 캐싱
   * @param {File} file - 이미지 파일
   * @returns {string} 이미지 URL
   */
  function createImageUrl(file) {
    const fileKey = `${file.name}-${file.size}-${file.lastModified}`

    if (!imageUrls.value.has(fileKey)) {
      const url = URL.createObjectURL(file)
      imageUrls.value.set(fileKey, url)
    }

    return imageUrls.value.get(fileKey)
  }

  /**
   * 이미지 로드 완료 처리
   * @param {Event} event - 로드 이벤트
   */
  function handleImageLoad(event) {
    const img = event.target
    img.classList.add('loaded')
  }

  /**
   * 이미지 로드 에러 처리
   * @param {Event} event - 에러 이벤트
   */
  function handleImageError(event) {
    console.warn('이미지 로드 실패:', event.target.src)
    event.target.style.display = 'none'
  }

  /**
   * 파일 업로드 처리 함수
   * @param {Event} event - 파일 입력 이벤트
   */
  function handleFileUpload(event) {
    const newFiles = Array.from(event.target.files)
    processFiles(newFiles)
    event.target.value = ''
  }

  // 드래그 앤 드롭 이벤트 핸들러들
  function onDragOver(event) {
    event.preventDefault()
    isDragging.value = true
  }

  function onDragEnter(event) {
    event.preventDefault()
    dragCounter.value++
    isDragging.value = true
  }

  function onDragLeave(event) {
    event.preventDefault()
    dragCounter.value--
    if (dragCounter.value === 0) {
      isDragging.value = false
    }
  }

  function onDrop(event) {
    event.preventDefault()
    isDragging.value = false
    dragCounter.value = 0
    const newFiles = Array.from(event.dataTransfer.files)
    processFiles(newFiles)
  }

  /**
   * 파일 처리 공통 함수
   * @param {File[]} newFiles - 새로 추가할 파일 배열
   */
  function processFiles(newFiles) {
    if (newFiles.length === 0) return

    const currentFiles = [...props.modelValue]
    const totalFiles = [...currentFiles, ...newFiles]

    if (totalFiles.length > 5) {
      alert('최대 5개 파일까지만 업로드 가능합니다.')
      return
    }

    const totalFileSize = totalFiles.reduce((acc, file) => acc + file.size, 0)
    if (totalFileSize > 52428800) {
      alert('총 파일 크기는 50MB를 초과할 수 없습니다.')
      return
    }

    emit('update:modelValue', totalFiles)
    emit('file-added', newFiles)
  }

  /**
   * 파일 삭제 함수
   * @param {number} index - 삭제할 파일의 인덱스
   */
  function removeFile(index) {
    const fileToRemove = props.modelValue[index]

    // URL 객체 정리
    if (isImageFile(fileToRemove)) {
      const fileKey = `${fileToRemove.name}-${fileToRemove.size}-${fileToRemove.lastModified}`
      const url = imageUrls.value.get(fileKey)
      if (url) {
        URL.revokeObjectURL(url)
        imageUrls.value.delete(fileKey)
      }
    }

    const updatedFiles = [...props.modelValue]
    updatedFiles.splice(index, 1)
    emit('update:modelValue', updatedFiles)
    emit('file-removed', fileToRemove)
  }

  /**
   * 모든 파일 삭제
   */
  function clearAllFiles() {
    if (confirm('모든 파일을 삭제하시겠습니까?')) {
      // 모든 URL 객체 정리
      imageUrls.value.forEach(url => URL.revokeObjectURL(url))
      imageUrls.value.clear()

      emit('update:modelValue', [])
      emit('files-cleared')
    }
  }

  // 컴포넌트 언마운트 시 URL 정리
  onBeforeUnmount(() => {
    imageUrls.value.forEach(url => {
      URL.revokeObjectURL(url)
    })
    imageUrls.value.clear()
  })
</script>
<style lang="scss" scoped>
  @use 'sass:color';

  // SCSS 변수 직접 정의 (임시 해결책)
  $primary-color: #00aaff;
  $font-size-xs: 10px;
  $font-size-sm: 12px;
  $font-size-md: 14px;

  .ui-attachment {
    width: 100%;
  }

  .attachment-section {
    margin-bottom: 16px;
    border: 1px dashed #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
  }

  .section-header {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background-color: #f5f5f5;
  }

  .section-title {
    font-weight: 500;
    font-size: $font-size-sm;
  }

  .section-content {
    padding: 0;
  }

  .attachment-container {
    width: 100%;
  }

  .attachment-content {
    padding: 16px;
    background-color: #f9f9f9;
    transition: all 0.3s ease;

    &.drag-over {
      border-color: $primary-color;
      background-color: rgba($primary-color, 0.05);
      box-shadow: 0 0 0 2px rgba($primary-color, 0.1);
    }
  }

  .file-upload-container {
    margin-bottom: 16px;
    text-align: center;
    border-radius: 6px;
  }

  .file-upload-label {
    display: inline-flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    gap: 8px;
    padding: 30px;
    border: 1px dashed;
    border-radius: 6px;
    color: #666;
    cursor: pointer;
    font-size: $font-size-sm;
    transition: color 0.2s;

    &:hover {
      color: $primary-color;
    }
  }

  .file-upload-input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .file-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .file-info-text {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: $font-size-sm;
    color: #666;
  }

  .file-icon {
    color: #999;
  }

  .file-formats {
    font-size: $font-size-xs;
    color: #999;
  }

  .uploaded-files-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 200px;
    overflow-y: auto;
  }

  // 미리보기 관련 스타일
  .preview-toggle-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    background: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: $font-size-xs;
    color: #666;

    &:hover {
      background-color: #f5f5f5;
      color: $primary-color;
    }
  }

  .file-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }

  .uploaded-file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background-color: #f5f5f5;
    border-radius: 4px;
    font-size: $font-size-sm;
  }

  .file-info-section {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  .file-type-icon {
    color: #666;
  }

  .file-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }

  .file-size {
    color: #999;
    font-size: $font-size-xs;
  }

  .image-preview-section {
    border-top: 1px solid #e0e0e0;
    padding-top: 16px;
    margin-top: 16px;
  }

  .preview-title {
    font-size: $font-size-md;
    font-weight: 600;
    margin-bottom: 12px;
    color: #333;
  }

  .image-preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }

  .image-preview-item {
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;

    &:hover .image-overlay {
      opacity: 1;
    }
  }

  .preview-image {
    width: 100%;
    height: 120px;
    object-fit: cover;
    display: block;
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .image-name {
    font-size: $font-size-xs;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .image-delete-btn {
    align-self: flex-end;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  .file-delete-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: #666;
    }
  }
</style>
