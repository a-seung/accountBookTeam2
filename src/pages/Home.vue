<template>
  <div class="container">
    <Header />

    <!-- 월 변경 바 -->
    <div class="calendar_header">
      <button @click="prevMonth" style="font-size: 20px">&lt;</button>
      <div class="calendar_month">{{ year }}년 {{ month }}월</div>
      <button @click="nextMonth" style="font-size: 20px">&gt;</button>
    </div>
    <SummaryStats :income="filteredIncome" :expense="filteredExpense" :filters="filters" @updateFilter="setFilters" />

    <div class="transactions">
      <div v-for="(groupedTransaction, date) in filteredGroupedTransactions" :key="date">
        <div class="transaction-date">
          <span>
            <button class="bold-date" @click="toggleTransactionVisibility(date)">{{ formatDateWithoutMonth(date) }} ({{ formatDayOfWeek(date) }})</button>
          </span>
        </div>
        <div v-show="isVisible(date)">
          <div v-if="groupedTransaction.length > 0">
            <div v-for="transaction in groupedTransaction" :key="transaction.id">
              <div class="transaction">
                <div class="transaction-details">
                  <div class="method" style="flex-basis: 80px; flex-grow: 0">
                    {{ transaction.category }}
                  </div>
                  <div class="description" style="flex-basis: 100px">
                    {{ transaction.content }}
                  </div>
                  <div
                    :class="{
                      blue: transaction.type === 'income',
                      red: transaction.type === 'expense',
                    }"
                  >
                    {{ transaction.type === 'income' ? '+' : '-' }}
                    {{ formatAmount(parseInt(transaction.amount)) }}원
                  </div>
                  <button class="delete-button" @click="deleteTransaction(transaction)">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="no-transactions">이 날짜에는 거래 내역이 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <button @click="openModal"><i class="fa fa-plus"></i></button>
    </div>

    <!-- 모달 창 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <AddTransaction @close="closeModal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useTransactionStore } from '@/stores/transaction';
import { useRouter } from 'vue-router';
import AddTransaction from '@/components/AddTransaction.vue';
import Header from '@/components/Header.vue';
import SummaryStats from '@/components/SummaryStats.vue';

const router = useRouter();
const transactionStore = useTransactionStore();
const currentDate = ref(new Date());
const showModal = ref(false);
const filters = ref({
  showIncome: true,
  showExpense: true,
  showBalance: false, // 처음에는 합계 버튼 눌렀을 때 전체 내역 보이지 않도록 설정
});

const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth() + 1);

const transactions = computed(() => transactionStore.total);

const totalIncome = computed(() => {
  return transactions.value.filter((transaction) => transaction.type === 'income').reduce((sum, transaction) => sum + parseInt(transaction.amount), 0);
});

const totalExpense = computed(() => {
  return transactions.value.filter((transaction) => transaction.type === 'expense').reduce((sum, transaction) => sum + parseInt(transaction.amount), 0);
});

const filteredTransactions = computed(() => {
  return transactions.value.filter((transaction) => {
    const [transactionYear, transactionMonth] = transaction.date.split('-');
    return parseInt(transactionYear) === year.value && parseInt(transactionMonth) === month.value;
  });
});

const filteredIncome = computed(() => {
  return filteredTransactions.value.filter((transaction) => transaction.type === 'income').reduce((sum, transaction) => sum + parseInt(transaction.amount), 0);
});

const filteredExpense = computed(() => {
  return filteredTransactions.value.filter((transaction) => transaction.type === 'expense').reduce((sum, transaction) => sum + parseInt(transaction.amount), 0);
});

function prevMonth() {
  month.value -= 1;
  if (month.value < 1) {
    month.value = 12;
    year.value -= 1;
  }
  updatePage();
}

function nextMonth() {
  month.value += 1;
  if (month.value > 12) {
    month.value = 1;
    year.value += 1;
  }
  updatePage();
}

const formatDateWithoutMonth = (date) => {
  const [year, month, day] = date.split('-');
  return `${parseInt(day)}일`;
};

const formatDayOfWeek = (date) => {
  const dayOfWeek = new Date(date).getDay();
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  return days[dayOfWeek];
};

const formatAmount = (amount) => {
  if (!amount) return '';
  return amount.toLocaleString();
};

let groupedTransactions = ref({});

function updatePage() {
  groupedTransactions.value = filteredTransactions.value.reduce((groups, transaction) => {
    const date = transaction.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});

  // 처음에 모든 날짜를 visibleTransactions 배열에 추가하여 모든 항목이 펼쳐지도록 설정
  visibleTransactions.value = Object.keys(groupedTransactions.value);
}

const filteredGroupedTransactions = computed(() => {
  const filtered = {};
  for (const date in groupedTransactions.value) {
    const dailyTransactions = groupedTransactions.value[date].filter((transaction) => {
      if (filters.value.showIncome && transaction.type === 'income') {
        return true;
      }
      if (filters.value.showExpense && transaction.type === 'expense') {
        return true;
      }
      return false;
    });

    if (dailyTransactions.length) {
      filtered[date] = dailyTransactions;
    }
  }
  return filtered;
});

function setFilters(newFilters) {
  filters.value = newFilters;
}

let visibleTransactions = ref([]);

function toggleTransactionVisibility(date) {
  const index = visibleTransactions.value.indexOf(date);
  if (index === -1) {
    visibleTransactions.value.push(date);
  } else {
    visibleTransactions.value.splice(index, 1);
  }
}

function isVisible(date) {
  return visibleTransactions.value.includes(date);
}

function deleteTransaction(transaction) {
  transactionStore.deleteTransaction(transaction);
}

function openModal() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

watch([year, month, transactions], () => {
  updatePage();
});

onMounted(() => {
  updatePage();
});
</script>

<style scoped src="@/assets/Home.css"></style>
