<template>
  <div class="ui-attachment">
    <div class="attachment-section">
      <div class="section-header">
        <span class="section-title">{{title}}</span>
      </div>
      <div class="section-content">
        <div 
          class="attachment-container"    
          @dragleave.prevent="onDragLeave"
          @drop.prevent="onDrop"
        >
          <div class="attachment-content" :class="{ 'drag-over': isDragging }">
            <div class="file-upload-container">
              <label for="file-upload" class="file-upload-label">
                <Icon name="mdi:plus" size="20" />
                <span>클릭하거나 드래그해서 파일을 추가하세요.</span>
              </label>
              <input
                id="file-upload"
                type="file"
                class="file-upload-input"
                multiple
                @change="handleFileUpload"
              />
            </div>
            
            <div class="file-info" v-if="files.length === 0">
              <div class="file-info-text">
                <Icon name="mdi:file-outline" size="24" class="file-icon" />
                <span>파일 개수 : 0 / 5　　Total Size : 0 / 52,428,800 bytes</span>
              </div>
              <div class="file-formats">
                <span>첨부 허용 확장자 : jpg,jpeg,gif,png,bmp,txt,pdf,xls,xlsx,ppt,pptx,doc,docx,hwp,zip,7z,rar,alz,hwpx,heic,avi,mp4</span>
              </div>
            </div>
            
            <div class="uploaded-files-list" v-if="files.length > 0">
              <div class="file-info-text">
                <span>파일 개수 : {{ files.length }} / 5　　Total Size : {{ totalSize }} / 52,428,800 bytes</span>
              </div>
              <div
                v-for="(file, index) in files"
                :key="index"
                class="uploaded-file-item"
              >
                <span class="file-name">{{ file.name }}</span>
                <button class="file-delete-btn" @click="removeFile(index)">
                  <Icon name="mdi:close" size="16" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '파일첨부'
  },
  modelValue: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue']);

// 파일 목록 관리
const files = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// 드래그 앤 드롭 상태 관리
const isDragging = ref(false);

// 총 파일 크기 계산
const totalSize = computed(() => {
  const size = files.value.reduce((acc, file) => acc + file.size, 0);
  return size.toLocaleString();
});

// 파일 업로드 처리
function handleFileUpload(event) {
  const newFiles = Array.from(event.target.files);
  processFiles(newFiles);
  // 파일 선택 후 input 초기화 (같은 파일 다시 선택 가능하도록)
  event.target.value = '';
}

// 드래그 앤 드롭 이벤트 핸들러
function onDragOver(event) {
  isDragging.value = true;
}

function onDragLeave(event) {
  isDragging.value = false;
}

function onDrop(event) {
  isDragging.value = false;
  const newFiles = Array.from(event.dataTransfer.files);
  processFiles(newFiles);
}

// 파일 처리 공통 함수
function processFiles(newFiles) {
  if (newFiles.length > 0) {
    // 최대 5개 파일만 허용
    const totalFiles = [...files.value, ...newFiles];
    if (totalFiles.length > 5) {
      alert('최대 5개 파일까지만 업로드 가능합니다.');
      return;
    }
    
    // 파일 크기 제한 (50MB = 52,428,800 bytes)
    const totalFileSize = totalFiles.reduce((acc, file) => acc + file.size, 0);
    if (totalFileSize > 52428800) {
      alert('총 파일 크기는 50MB를 초과할 수 없습니다.');
      return;
    }
    
    files.value = totalFiles;
  }
}

// 파일 삭제
function removeFile(index) {
  const updatedFiles = [...files.value];
  updatedFiles.splice(index, 1);
  files.value = updatedFiles;
}
</script>

<style lang="scss" scoped>
@use "sass:color";

.ui-attachment {
  width: 100%;
}

.attachment-section {
  margin-bottom: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
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
}

.file-upload-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
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

.uploaded-file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: $font-size-sm;
}

.file-name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 8px;
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

.drive-content {
  padding: 16px;
  min-height: 100px;
  background-color: #f9f9f9;
}
</style>