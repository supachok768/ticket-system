<template>
  <h2 class="intro-y text-lg font-medium mt-10">Ticket Buy</h2>
  <div
    class="
      px-5
      pb-4
      grid grid-cols-12
      gap-3
      sm:gap-6
      border-b border-slate-200/60
    "
  >
    <div
      v-for="(ticket, key) in ticketList"
      :key="key"
      class="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2"
    >
      <div
        class="
          file
          box
          border-slate-200/60
          dark:border-darkmode-400
          shadow-none
          rounded-md
          px-5
          pt-8
          pb-5
          px-3
          sm:px-5
          relative
        "
      >
        <div class="w-3/5 file__icon file__icon--image mx-auto">
          <div class="file__icon--image__preview image-fit">
            <img
              alt="Rocketman Tailwind HTML Admin Template"
              src="@/assets/images/ticket/ticket.png"
            />
          </div>
        </div>
        <p class="block font-medium mt-4 text-center truncate">
          {{ ticket.name }}
        </p>
        <div class="text-slate-500 text-xs text-center mt-0.5">
          Remaining amount : {{ ticket.amountLimitPerDay }}
        </div>
        <div class="text-slate-500 text-xs text-center mt-0.5">
          Minimum buying : {{ ticket.minimumBuy }}
        </div>
        <div class="flex justify-center mt-3 text-center">
          <button class="btn btn-outline-primary font-small">
            <MinusIcon class="w-3 h-3" @click="changeBuyAmount(-1, ticket)" />
          </button>
          <p class="p-2 mr-3 ml-3">{{ ticket.buyAmount }}</p>
          <button class="btn btn-outline-primary font-small">
            <PlusIcon class="w-3 h-3" @click="changeBuyAmount(1, ticket)" />
          </button>
        </div>
        <div class="mt-3 text-center">
          <button
            type="submit"
            class="btn btn-primary pr-10 pl-10"
            @click="buyTicket(ticket)"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TicketService from "../../service/ticket.service";

export default {
  data() {
    return {
      ticketService: new TicketService(this.$axios),
      ticketList: [],
    };
  },
  mounted() {
    this.getTicket();
  },
  methods: {
    getTicket() {
      this.ticketService
        .getTicket()
        .then((result) => {
          this.ticketList = result.data.data.map((x) => ({
            ...x,
            buyAmount: x.minimumBuy,
          }));
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    buyTicket(item) {
      this.ticketService
        .buyTicket(item.id, item.name, item.buyAmount)
        .then((result) => {
          alert("Buy ticket success");
          this.$router.push({
            name: "my-ticket",
          });
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    changeBuyAmount(amount, item) {
      if (item.buyAmount + amount < item.minimumBuy) {
        return;
      }

      item.buyAmount += amount;
    },
  },
};
</script>