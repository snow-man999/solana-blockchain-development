<template>
  <div class="bg">
    <p class="title">Escrow UI</p>
    <div>
      <div class="mb-1">
          <label for="alice-private-key">Throwaway private key (as byte array from sollet.io, without the '[]')</label>
          <input 
            class="display-block" 
            type="text" 
            id="alice-private-key"
            v-model="formState.privateKey" 
            placeholder="e.g. 1,2,3,..."
            :disabled="loading"
          >
      </div>
      <div class="mb-1">
          <label for="alice-program-id">Program id</label>
          <input 
            class="display-block" 
            type="text" 
            id="alice-program-id" 
            v-model="formState.programId" 
            placeholder="Program ID"
            :disabled="loading"
          >
      </div>
      <div class="mb-1">
          <label for="alice-x-token-acc">Alice's X token account pubkey</label>
          <input 
            class="display-block" 
            type="text" 
            id="alice-x-token-acc"
            v-model="formState.aliceXTokenAccountPubkey" 
            placeholder="X Token Account Pubkey"
            :disabled="loading"
          >
      </div>
      <div class="mb-1">
          <label for="alice-x-token-amount">Amount of X tokens to send to escrow</label>
          <input 
            class="display-block" 
            type="number" 
            id="alice-x-token-amount"
            v-model="formState.amountXTokensToSendToEscrow" 
            placeholder="Amount to send"
            min="0"
            :disabled="loading"
          >
      </div>
      <div class="mb-1">
          <label for="alice-y-token-acc">Alice's Y token account pubkey</label>
          <input 
            class="display-block" 
            type="text" 
            id="alice-y-token-acc"
            v-model="formState.aliceYTokenAccountPubkey" 
            placeholder="Y Token Account Pubkey"
            :disabled="loading"
          >
      </div>
      <div class="mb-1">
          <label for="alice-y-token-amount">Amount of Y tokens Alice wants</label>
          <input 
            class="display-block" 
            type="number" 
            id="alice-y-token-amount"
            v-model="formState.amountYTokensAliceExpects" 
            placeholder="Amount expected"
            min="0"
            :disabled="loading"
          >
      </div>
      <div class="mb-1">
          <input style="margin-right: 5px;" class="cursor-pointer border-none bg-btn normal-font-size" type="button" value="Reset UI" @click="resetAliceUI" :disabled="loading">
          <input class="cursor-pointer border-none bg-btn normal-font-size" type="button" value="Init escrow" @click="onInitEscrow" :disabled="!isFormValid || loading">
          <span v-if="loading" style="margin-left: 10px;">Initializing escrow...</span>
      </div>
      <div v-if="errorMessage" class="mb-1 error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="mb-1 success-message">{{ successMessage }}</div>
    </div>
    <div>
      <div class="mb-1">
        Escrow account:
        <div>
          {{ escrowState.escrowAccountPubkey ?? '--' }}
          <button v-if="escrowState.escrowAccountPubkey" @click="copyEscrowPubkey" style="margin-left: 5px;">Copy</button>
        </div>
      </div>
      <div class="mb-1">
        Decoded State
      </div>
      <div class="mb-1">
        Is initialized:
        <div>{{ escrowState.isInitialized ?? '--' }}</div>
      </div>
      <div class="mb-1">
        Initializer account:
        <div>{{ escrowState.initializerAccountPubkey ?? '--' }}</div>
      </div>
      <div class="mb-1">
        Initializer account:
        <div>{{ escrowState.initializerAccountPubkey ?? '--' }}</div>
      </div>
      <div class="mb-1">
        X token temp account:
        <div>{{ escrowState.XTokenTempAccountPubkey ?? '--' }}</div>
      </div>
      <div class="mb-1">
        Initializer Y token account:
        <div>{{ escrowState.initializerYTokenAccount ?? '--' }}</div>
      </div>
      <div class="mb-1">
        ExpectedAmount:
        <div>{{ escrowState.expectedAmount ?? '--' }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from "vue";
import { initEscrow } from "./util/initEscrow";

interface EscrowState {
    escrowAccountPubkey: null | string;
    isInitialized: null | boolean;
    initializerAccountPubkey: null | string;
    XTokenTempAccountPubkey: null | string;
    initializerYTokenAccount: null | string;
    expectedAmount: null | number;
}

export default defineComponent({
  setup() {
    const formState = reactive({
      privateKey: "",
      programId: "",
      aliceXTokenAccountPubkey: "",
      aliceYTokenAccountPubkey: "",
      amountXTokensToSendToEscrow: 0,
      amountYTokensAliceExpects: 0
    })

    const escrowState: EscrowState = reactive({
      escrowAccountPubkey: null,
      isInitialized: null,
      initializerAccountPubkey: null,
      XTokenTempAccountPubkey: null,
      initializerYTokenAccount: null,
      expectedAmount: null
    });

    const loading = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");

    const isFormValid = computed(() => {
      return (
        formState.privateKey.trim() !== "" &&
        formState.programId.trim() !== "" &&
        formState.aliceXTokenAccountPubkey.trim() !== "" &&
        formState.aliceYTokenAccountPubkey.trim() !== "" &&
        formState.amountXTokensToSendToEscrow > 0 &&
        formState.amountYTokensAliceExpects > 0
      );
    });

    const resetAliceUI = () => {
      formState.privateKey = "";
      formState.programId = "";
      formState.aliceXTokenAccountPubkey = "";
      formState.aliceYTokenAccountPubkey = "";
      formState.amountXTokensToSendToEscrow = 0;
      formState.amountYTokensAliceExpects = 0;
      Object.keys(escrowState).forEach(key => escrowState[key as keyof EscrowState] = null);
      errorMessage.value = "";
      successMessage.value = "";
    }

    const onInitEscrow = async () => {
      if (!isFormValid.value) {
        errorMessage.value = "Please fill in all fields with valid values.";
        return;
      }
      loading.value = true;
      errorMessage.value = "";
      successMessage.value = "";
      try {
        const {
          escrowAccountPubkey,
          isInitialized,
          initializerAccountPubkey,
          XTokenTempAccountPubkey,
          initializerYTokenAccount,
          expectedAmount
        } = await initEscrow(
          formState.privateKey,
          formState.aliceXTokenAccountPubkey,
          formState.amountXTokensToSendToEscrow,
          formState.aliceYTokenAccountPubkey,
          formState.amountYTokensAliceExpects,
          formState.programId
        );
        escrowState.escrowAccountPubkey = escrowAccountPubkey;
        escrowState.isInitialized = isInitialized;
        escrowState.initializerAccountPubkey = initializerAccountPubkey;
        escrowState.XTokenTempAccountPubkey = XTokenTempAccountPubkey;
        escrowState.initializerYTokenAccount = initializerYTokenAccount;
        escrowState.expectedAmount = expectedAmount;
        successMessage.value = "Escrow initialized successfully!";
      } catch(err) {
        if (err instanceof Error) {
          errorMessage.value = err.message;
        } else {
          errorMessage.value = String(err);
        }
      } finally {
        loading.value = false;
      }
    }

    const copyEscrowPubkey = () => {
      if (escrowState.escrowAccountPubkey) {
        navigator.clipboard.writeText(escrowState.escrowAccountPubkey);
        successMessage.value = "Escrow account pubkey copied!";
      }
    }

    return {
      formState,
      resetAliceUI,
      onInitEscrow,
      escrowState,
      loading,
      errorMessage,
      successMessage,
      isFormValid,
      copyEscrowPubkey
    }
  }
})
</script>
