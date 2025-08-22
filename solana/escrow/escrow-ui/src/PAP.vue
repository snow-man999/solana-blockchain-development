//this is PAP.vue file
<template>
  <div class="bg">
    <p class="title">Escrow UI - Bob's Trade Interface</p>
    <div>
      <div class="mb-1">
          <label for="private-key">Throwaway private key (as byte array from sollet.io, without the '[]')</label>
          <input 
            class="display-block" 
            type="text" 
            id="private-key"
            v-model="formState.privateKey" 
            placeholder="e.g. 1,2,3,..."
            :disabled="loading"
          >
      </div>
      <div class="mb-1">
          <label for="program-id">Program id</label>
          <input 
            class="display-block" 
            type="text" 
            id="program-id" 
            v-model="formState.programId"
            placeholder="Program ID"
            :disabled="loading"
          >
      </div>
      <div class="mb-1">
          <label for="taker-x-acc">Bob's X token account pubkey</label>
          <input 
            class="display-block" 
            type="text" 
            id="taker-x-acc"
            v-model="formState.takerXAccAddress"
            placeholder="X Token Account Pubkey"
            :disabled="loading"
          >
      </div>
      <div class="mb-1">
          <label for="taker-y-acc">Bob's Y token account pubkey</label>
          <input 
            class="display-block" 
            type="text" 
            id="taker-y-acc"
            v-model="formState.takerYAccAddress"
            placeholder="Y Token Account Pubkey"
            :disabled="loading"
          >
      </div>
      <div class="mb-1">
          <label for="escrow-acc">Escrow account pubkey</label>
          <input 
            class="display-block" 
            type="text" 
            id="escrow-acc"
            v-model="formState.escrowAccAddress"
            placeholder="Escrow Account Pubkey"
            :disabled="loading"
          >
      </div>
      <div class="mb-1">
          <label for="x-token-amount">Amount X tokens Bob wants</label>
          <input 
            class="display-block" 
            type="number" 
            id="x-token-amount"
            v-model="formState.XTokenExpectedAmount"
            placeholder="Amount expected"
            min="0"
            :disabled="loading"
          >
      </div>
      <div class="mb-1">
          <input 
            style="margin-right: 5px;" 
            class="cursor-pointer border-none bg-btn normal-font-size" 
            type="button" 
            value="Reset UI" 
            @click="resetUI"
            :disabled="loading"
          >
          <input 
            class="cursor-pointer border-none bg-btn normal-font-size" 
            type="button" 
            value="Take trade" 
            @click="onTakeTrade"
            :disabled="!isFormValid || loading"
          >
          <span v-if="loading" style="margin-left: 10px;">Processing trade...</span>
      </div>
      <div v-if="errorMessage" class="mb-1 error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="mb-1 success-message">{{ successMessage }}</div>
    </div>
  </div>
</template>

<script lang="ts"> 
import { defineComponent, reactive, computed, ref } from 'vue';
import { takeTrade } from "./util/takeTrade";

export default defineComponent({
    setup() {
        const formState = reactive({
            privateKey: "",
            programId: "",
            takerXAccAddress: "",
            takerYAccAddress: "",
            escrowAccAddress: "",
            XTokenExpectedAmount: 0
        })

        const loading = ref(false);
        const errorMessage = ref("");
        const successMessage = ref("");

        const isFormValid = computed(() => {
            return (
                formState.privateKey.trim() !== "" &&
                formState.programId.trim() !== "" &&
                formState.takerXAccAddress.trim() !== "" &&
                formState.takerYAccAddress.trim() !== "" &&
                formState.escrowAccAddress.trim() !== "" &&
                formState.XTokenExpectedAmount > 0
            );
        });

        const resetUI = () => {
            formState.privateKey = "";
            formState.programId = "";
            formState.takerXAccAddress = "";
            formState.takerYAccAddress = "";
            formState.escrowAccAddress = "";
            formState.XTokenExpectedAmount = 0;
            errorMessage.value = "";
            successMessage.value = "";
        }
        
        const onTakeTrade = async () => {
            if (!isFormValid.value) {
                errorMessage.value = "Please fill in all fields with valid values.";
                return;
            }
            
            loading.value = true;
            errorMessage.value = "";
            successMessage.value = "";
            
            try {
                await takeTrade(
                    formState.privateKey,
                    formState.escrowAccAddress,
                    formState.takerXAccAddress,
                    formState.takerYAccAddress,
                    formState.XTokenExpectedAmount,
                    formState.programId
                );
                successMessage.value = "Success! Alice and Bob have traded their tokens and all temporary accounts have been closed";
            } catch (err) {
                if (err instanceof Error) {
                    errorMessage.value = err.message;
                } else {
                    errorMessage.value = String(err);
                }
            } finally {
                loading.value = false;
            }
        }

        return { 
            formState, 
            resetUI, 
            onTakeTrade, 
            loading, 
            errorMessage, 
            successMessage, 
            isFormValid 
        };
    }
})
</script>
