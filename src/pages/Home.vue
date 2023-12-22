<script lang="ts" setup>
import { ref } from "vue";
import { AxiosError } from "axios";
import router from "../router";

import {
  InformationCircleIcon,
  ArrowPathIcon,
  HeartIcon,
} from "@heroicons/vue/24/solid";

import Nav from "../components/Nav.vue";
import Loading from "../components/Loading.vue";

import MenuCard from "../components/MenuCard.vue";
import { useBalanceService } from "../api";


const loadData = ref<boolean>(false);
const currentBalance = ref<string>("");
const errorMessage = ref<string>("");
const balanceService = useBalanceService();

async function getBalance() {
  loadData.value = false;
  await balanceService
    .getBalance()
    .then((res) => {
      currentBalance.value = res.data.balanceCommerce;
      loadData.value = true;
    })
    .catch((err: AxiosError) => {
      if (err.response?.status === 401) {
        router.push("/401");
      } else {
        errorMessage.value = 'Ocurrio un error al obtener el saldo, inténtelo nuevamente en uns minutos.';
      }
      loadData.value = true;
    });
}

getBalance();
</script>

<template>
  <div>
    <header>
      <Nav title="Recargas y Pagos" />
    </header>
    <main>
      <div class="m-7 flex flex-col gap-3">
        <div class="flex flex-row gap-2 text-gray-600">
          <p>Saldo Virtual</p>
          <InformationCircleIcon class="h-5 w-5 text-cyan-500" />
        </div>

        <div v-if="loadData">
          <div class="flex flex-row gap-2">
            <p v-if="errorMessage == ''" class="text-3xl font-bold">S/. {{ currentBalance }}</p>
            <p v-if="errorMessage != ''" class="text-xs font-bold">{{ errorMessage }}</p>
            <button @click="getBalance()">
              <ArrowPathIcon class="h-5 w-5 text-cyan-500 m-2" />
            </button>
          </div>
        </div>

        <div v-if="!loadData">
          <Loading />
        </div>

        <div>
          <button
            class="px-5 py-1 text-sm border leading-5 rounded-full border-gray-400 text-gray-800 flex flex-row"
          >
            <HeartIcon class="w-4 h-4" />
            ¿Cómo recargar mi saldo virtual?
          </button>
        </div>
        <div class="flex flex-row gap-1 font-semibold">
          <p class="text-gray-600">Código para usar tu saldo:</p>
          <p class="text-cyan-600">{12345678901}</p>
        </div>
      </div>
      <hr />
      <div>
        <MenuCard title="Recargas" url="/recargas" />
        <MenuCard title="Pago de servicios" url="/pagos" />
        <MenuCard title="Historial de ganancias y operaciones" url="/historial" />
      </div>
    </main>
  </div>
</template>
