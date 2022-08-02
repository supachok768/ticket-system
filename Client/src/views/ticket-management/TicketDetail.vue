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
            @click="onBackTicketList"
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
import TicketService from "../../service/ticket.service";
export default {
  data() {
    return {
      ticketService: new TicketService(this.$axios),
      form: {
        name: "",
        price: 0,
        limitPerDay: 0,
        minBuy: 0,
        isActive: true,
      },
    };
  },
  mounted() {
    if (this.$route.params.mode == "new") {
      return;
    }
    if (isNaN(this.$route.params.id)) {
      alert("parameter is not integers");
      this.$router.push({ name: "ticket-list" });
      return;
    }
    this.getTicket();
  },
  methods: {
    getTicket() {
      this.ticketService
        .getTicketById(this.$route.params.id)
        .then((result) => {
          this.form.name = result.data.data.name;
          this.form.price = result.data.data.price;
          this.form.limitPerDay = result.data.data.amountLimitPerDay;
          this.form.minBuy = result.data.data.minimumBuy;
          this.form.isActive = result.data.data.isActive;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    onSave() {
      if (this.$route.params.mode == "new") {
        this.ticketService
          .createTicket(
            this.form.name,
            this.form.price,
            this.form.limitPerDay,
            this.form.minBuy,
            this.form.isActive
          )
          .then((result) => {
            this.onBackTicketList();
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      }

      if (this.$route.params.mode == "edit") {
        this.ticketService
          .updateTicket(
            this.$route.params.id,
            this.form.name,
            this.form.price,
            this.form.limitPerDay,
            this.form.minBuy,
            this.form.isActive
          )
          .then((result) => {
            this.onBackTicketList();
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      }
    },
    onBackTicketList() {
      this.$router.push({
        name: "ticket-list",
      });
    },
  },
};
</script>