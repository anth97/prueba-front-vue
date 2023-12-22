<script lang="ts" setup>
import { ref } from "vue";
import { AxiosError } from "axios";
import router from "../router";

import Nav from "../components/Nav.vue";
import Loading from "../components/Loading.vue";
import Provider from "../components/Provider.vue";

import { useProviders } from "../api";
import { ListProvidersInterface } from "../interface/providers.interface";

import {
  InformationCircleIcon,
  ArrowPathIcon,
  StarIcon,
  HeartIcon,
} from "@heroicons/vue/24/solid";

const listaButton = [
  {
    title: "Todas",
    icon: HeartIcon,
  },
  {
    title: "Favoritas",
    icon: ArrowPathIcon,
  },
  {
    title: "Telefonía",
    icon: InformationCircleIcon,
  },
];

const providerService = useProviders();
const listProviders = ref<ListProvidersInterface[]>([]);
const loadData = ref<boolean>(false);
const errorMessage = ref<string>("");

const searchInput = ref<HTMLInputElement | null>(null);

async function getProviders() {
  await providerService
    .getProviders()
    .then((res) => {
      listProviders.value = res.data.companies;
      loadData.value = true;
    })
    .catch((err: AxiosError) => {
      if (err.response?.status === 401) {
        router.push("/401");
      } else {
        errorMessage.value =
          "Ocurrio un error al obtener los datos. Inténtelo nuevamente en unos minutos.";
      }
      loadData.value = true;
    });
}

function searchProviders() {
  const termSearch: string = String(searchInput.value);
  if (termSearch) {
    const result = listProviders.value.filter((provider) => {
      const company = provider.company.toLowerCase();
      const searchTerm = termSearch.toLowerCase();
      return company.includes(searchTerm);
    });
    listProviders.value = result;
  }
}

getProviders();
</script>

<template>
  <div>
    <header>
      <Nav title="Recargas" />
    </header>
    <main class="overflow-auto h-fit">
      <div class="m-4 flex flex-col gap-4">
        <div class="flex flex-col">
          <label class="text-xs font-semibold" for="search"
            >Buscar Empresa</label
          >
          <input
            type="text"
            placeholder="ej. Culqui"
            class="border rounded border-gray-200 h-12 p-3 bg-gray-200"
            v-model="searchInput"
            @input="searchProviders"
          />
        </div>

        <div class="flex flex-nowrap overflow-auto gap-1 p-2">
          <button
            v-for="button in listaButton"
            :key="button.title"
            class="px-5 py-1 text-sm border leading-5
            rounded-full min-w-auto border-gray-400
            items-center
            text-gray-800 flex flex-row focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <StarIcon class="w-3 h-3 mr-1" />
            {{ button.title }}
          </button>
        </div>
        <br />

        <div v-if="loadData">
          <div v-if="errorMessage == ''">
            <div v-for="provider in listProviders">
              <Provider :name="provider.company" :image="provider.image" />
            </div>
          </div>
          <div v-if="errorMessage != ''">
            <p class="text-xs font-bold">{{ errorMessage }}</p>
          </div>
        </div>
        <div v-if="!loadData">
          <Loading />
        </div>
      </div>
    </main>
  </div>
</template>
