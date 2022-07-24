<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">
      {{ $route.params.mode == "new" ? "New user" : "Edit user" }}
    </h2>
  </div>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="intro-y col-span-12 lg:col-span-6">
      <!-- BEGIN: Form Layout -->
      <div class="intro-y box p-5">
        <div>
          <label for="formFName" class="form-label">First Name</label>
          <input
            id="formFName"
            type="text"
            class="form-control w-full"
            placeholder="Input text"
            v-model="form.firstName"
          />
        </div>
        <div class="mt-3">
          <label for="formLName" class="form-label">Last Name</label>
          <input
            id="formLName"
            type="text"
            class="form-control w-full"
            placeholder="Input text"
            v-model="form.lastName"
          />
        </div>
        <div class="mt-3">
          <label for="formEmail" class="form-label">Email</label>
          <input
            id="formEmail"
            type="email"
            class="form-control w-full"
            placeholder="Input text"
            v-model="form.email"
          />
        </div>
        <div class="mt-3">
          <label for="formPassword" class="form-label">Password</label>
          <input
            id="formPassword"
            type="password"
            class="form-control w-full"
            placeholder="Input text"
            v-model="form.password"
          />
        </div>
        <div class="mt-3">
          <label for="formCfPassword" class="form-label"
            >Confirm password</label
          >
          <input
            id="formCfPassword"
            type="password"
            class="form-control w-full"
            placeholder="Input text"
            v-model="form.confirmPassword"
          />
        </div>
        <div class="mt-3">
          <label for="formType" class="form-label">Type</label>
          <TomSelect id="formType" v-model="form.type" class="w-full" multiple>
            <option value="SuperAdmin">SuperAdmin</option>
            <option value="TicketManager">TicketManager</option>
            <option value="Client">Client</option>
            <option value="Supporter">Supporter</option>
          </TomSelect>
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
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        type: [],
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