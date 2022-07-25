<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">
      {{ $route.params.mode == "new" ? "New ticket" : "Edit ticket" }}
    </h2>
  </div>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="intro-y col-span-12 lg:col-span-6">
      <!-- BEGIN: Form Layout -->
      <div class="intro-y box p-5">
        <div>
          <label for="formName" class="form-label">Name</label>
          <input
            id="formName"
            type="text"
            class="form-control w-full"
            placeholder="Input text"
            v-model="form.name"
          />
        </div>
        <div class="mt-3">
          <label for="formPrice" class="form-label">Price</label>
          <input
            id="formPrice"
            type="number"
            min="0"
            class="form-control w-full"
            placeholder="Input text"
            v-model="form.price"
          />
        </div>
        <div class="mt-3">
          <label for="formLimitPerDay" class="form-label">Limit per day</label>
          <input
            id="formLimitPerDay"
            type="number"
            min="0"
            class="form-control w-full"
            placeholder="Input text"
            v-model="form.limitPerDay"
          />
        </div>
        <div class="mt-3">
          <label for="formMinBuying" class="form-label">Minimum buying</label>
          <input
            id="formMinBuying"
            type="number"
            min="0"
            class="form-control w-full"
            placeholder="Input text"
            v-model="form.minBuy"
          />
        </div>
        <div class="mt-3">
          <label>Active Status</label>
          <div class="form-switch mt-2">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="form.isActive"
            />
          </div>
        </div>
        <div class="text-right mt-5">
          <button
            type="button"
            class="btn btn-outline-secondary w-24 mr-1"
            @click="onCancel"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-primary w-24" @click="onSave">
            Save
          </button>
        </div>
      </div>
      <!-- END: Form Layout -->
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      form: {
        name: "",
        price: 0,
        limitPerDay: 0,
        minBuy: 0,
        isActive: true,
      },
    };
  },
  methods: {
    onSave() {},
    onCancel() {
      this.$router.push({
        name: "user-list",
      });
    },
  },
};
</script>