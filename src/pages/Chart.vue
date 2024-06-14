<template>
  <div class="container">
    <Header />

    <!-- 월 변경 바 -->
    <div class="calendar_header">
      <button @click="prevMonth"><i class="mdi mdi-chevron-left"></i></button>
      <div class="calendar_month">{{ year }}년 {{ month }}월</div>
      <button @click="nextMonth"><i class="mdi mdi-chevron-right"></i></button>
    </div>

    <SummaryStats 
      :income="totalIncome" 
      :expense="totalExpense" 
      :filters="filters" 
      @updateFilter="setFilter" 
    />

    <!-- 간격을 벌릴 부분 -->
    <div class="chart-container">
      <DoughnutChart :chartData="chartData" :chartOptions="chartOptions" />
    </div>

    <!-- 간격을 벌릴 부분 -->
    <ul class="item-list">
      <li
        v-for="(item, index) in items"
        :key="index"
        :style="{
          backgroundColor: item.backgroundColor,
          borderColor: item.borderColor,
        }"
      >
        <img :src="item.image" alt="" class="item-image" />
        <div class="item-details">
          <p class="item-name">{{ item.name }}</p>
          <p class="item-amount">{{ formatNumber(item.amount) }}원</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DoughnutChart from "@/components/DoughnutChart.vue";
import Header from "@/components/Header.vue";
import SummaryStats from '@/components/SummaryStats.vue'; // SummaryStats 컴포넌트 가져오기

const chartData = ref({
  labels: ["식비", "교통비", "여가비", "재테크", "고정비", "기타"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ],
      borderColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ],
      borderWidth: 1,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      labels: {
        padding: 10,
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
  },
});

const items = ref([
  {
    image: "./public/food.png",
    name: "식비",
    amount: 1200000,
    backgroundColor: "#FF6384",
    borderColor: "#FF6384",
  },
  {
    image: "./public/traffic.png",
    name: "교통비",
    amount: 300000,
    backgroundColor: "#36A2EB",
    borderColor: "#36A2EB",
  },
  {
    image: "./public/gamepad.png",
    name: "여가비",
    amount: 1500000,
    backgroundColor: "#FFCE56",
    borderColor: "#FFCE56",
  },
  {
    image: "./public/dollar.png",
    name: "재테크",
    amount: 700000,
    backgroundColor: "#4BC0C0",
    borderColor: "#4BC0C0",
  },
  {
    image: "./public/house.png",
    name: "고정비",
    amount: 400000,
    backgroundColor: "#9966FF",
    borderColor: "#9966FF",
  },
  {
    image: "./public/food.png",
    name: "기타",
    amount: 500000,
    backgroundColor: "#FF9F40",
    borderColor: "#FF9F40",
  },
]);

const totalIncome = ref(5000000); // 총 수입 예시값 (500만원)
const totalExpense = ref(3000000); // 총 지출 예시값 (300만원)
const filters = ref({ showIncome: true, showExpense: true, showBalance: true }); // 필터 초기값

const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth() + 1);

function setFilter(newFilters) {
  filters.value = newFilters;
}

function prevMonth() {
  month.value -= 1;
  if (month.value < 1) {
    month.value = 12;
    year.value -= 1;
  }
}

function nextMonth() {
  month.value += 1;
  if (month.value > 12) {
    month.value = 1;
    year.value += 1;
  }
}

function formatNumber(value) {
  return value.toLocaleString();
}
</script>
<!-- aa -->
<style scoped>
.chart-container {
  margin-bottom: 10px; /* 도넛 차트와 리스트 사이의 간격을 줄입니다. */
  text-align: center; /* 내용을 가운데 정렬합니다. */
  height: 200px; /* 도넛 차트의 높이를 제한합니다. */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px; /* SummaryStats와의 간격을 추가합니다. */
}

.chart-container canvas {
  max-height: 100%; /* 캔버스의 최대 높이를 제한합니다. */
}

.item-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 300px; /* 리스트의 최대 높이를 설정합니다. */
  overflow-y: auto; /* 리스트가 최대 높이를 초과할 경우 스크롤 가능하게 합니다. */
  margin-top: 10px; /* SummaryStats와의 간격을 추가합니다. */
}

.item-list li {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 아이템들을 좌우 정렬하게 설정합니다. */
  border-width: 1px;
  border-style: solid;
  margin: 0 auto 10px; /* 위 0, 좌우 자동, 아래 10px 간격을 줍니다. */
  padding: 5px;
  max-width: 350px; /* 각 리스트 아이템의 최대 너비를 설정합니다. */
  gap: 10px;
}

.item-list li img.item-image {
  width: 40px; /* 이미지의 너비를 설정합니다. */
  height: auto; /* 이미지의 높이를 자동으로 조정합니다. */
  margin-right: 10px;
}

.item-list li .item-details {
  flex: 1; /* 내용이 넘치지 않도록 유연하게 조정합니다. */
  display: flex;
  align-items: center;
}

.item-list li .item-details .item-name {
  margin: 0;
  font-weight: bold;
  font-size: 14px; /* 항목 이름의 글꼴 크기를 조정합니다. */
}

.item-list li .item-details .item-amount {
  margin-left: auto; /* amount를 항상 우측에 정렬합니다. */
  font-size: 14px; /* 금액의 글꼴 크기를 키웁니다. */
  font-weight: bold; /* 금액을 굵게 표시합니다. */
}

.container {
  max-width: 375px;
  margin: 0 auto; /* 가운데 정렬 */
}

.calendar_header {
  display: flex;
  height: 80px;
  font-size: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 0 20px;
}

.calendar_month {
  font-weight: bold;
}

.header-center {
  font-size: 18px;
  font-weight: bold;
}

.mdi {
  font-size: 35px;
}

@media (min-width: 375px) {
  /* 375px 이상의 너비에서 적용되는 스타일 */
  .chart-container {
    max-width: 350px; /* 도넛 차트의 최대 너비를 설정합니다. */
    margin: 0 auto; /* 가운데 정렬합니다. */
  }
}
</style>
