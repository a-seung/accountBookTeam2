<template>
  <!-- 전체 화면 설정 -->
  <div class="container">
    <!-- 설정 글씨. 화살표 삽입 -->
    <div class="invisible_box_for_text">
      <!-- 왼쪽 화살표 추가 -->
      <button @click="navigate" style="font-size: 20px" class="arrow_go_back">
        &lt;
      </button>

      <div class="bold_text">설정</div>
    </div>

    <!-- 프로필이미지 -->
    <div class="ellipse"></div>

    <!-- 프로필 이름 -->
    <div
      class="name"
      style="left: 50%; transform: translateX(-50%); top: 375px"
    >
      문준일
    </div>

    <!-- 설정 개체 -->
    <!-- 내정보 소분류 -->
    <div
      class="mini_menu"
      style="left: 20; transform: translateY(40%); top: 410px"
    >
      내정보
    </div>

    <div class="group group1">
      <div class="rectangle"></div>
      <div class="text">
        프로필 수정
        <button style="font-size: 20x" class="button arrow_next_text">
          &gt;
        </button>
      </div>
      <div class="rotated"></div>
    </div>

    <div class="group group2">
      <div class="rectangle"></div>
      <div class="text">
        내 정보 수정
        <button style="font-size: 20px" class="button arrow_next_text">
          &gt;
        </button>
      </div>
      <div class="rotated"></div>
    </div>

    <!-- 가계부 소분류 -->
    <div
      class="mini_menu"
      style="left: 20px; transform: translateY(40%); top: 581px"
    >
      가계부
    </div>

    <div class="group group3">
      <div class="rectangle"></div>
      <div class="text">
        수입분류 관리
        <button style="font-size: 20x" class="button arrow_next_text">
          &gt;
        </button>
      </div>
      <div class="rotated"></div>
    </div>

    <div class="group group4">
      <div class="rectangle"></div>
      <div class="text">
        지출분류 관리
        <button style="font-size: 20x" class="button arrow_next_text">
          &gt;
        </button>
      </div>
      <div class="rotated"></div>
    </div>

    <div class="group group5">
      <div class="rectangle"></div>
      <div class="text">
        자산설정
        <button style="font-size: 20x" class="button arrow_next_text">
          &gt;
        </button>
      </div>
      <div class="rotated"></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigate = (path) => {
  router.push('/');
};
</script>

<style src="@/assets/settings.css"></style>

<style>
.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
