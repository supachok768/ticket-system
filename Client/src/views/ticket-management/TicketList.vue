<template>
  <h2 class="intro-y text-lg font-medium mt-10">Ticket List</h2>
  <div
    class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2"
  >
    <div class="hidden md:block mx-auto text-slate-500">
      Showing 1 to 10 of 150 entries
    </div>
    <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
      <button class="btn btn-primary shadow-md mr-2" @click="onNew">
        Add New Ticket
      </button>
    </div>
  </div>

  <!-- BEGIN: Filter -->
  <div class="intro-y box p-5 mt-7 flex flex-col xl:flex-row gap-y-3">
    <div
      class="
        form-inline
        flex-1 flex-col
        xl:flex-row
        items-start
        xl:items-center
        gap-y-2
        xl:mr-6
      "
    >
      <div class="w-full relative text-slate-500">
        <input
          type="text"
          class="form-control w-full box pr-10"
          placeholder="Search..."
          v-model="search.name"
        />
        <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
      </div>
    </div>
    <div
      class="
        form-inline
        flex-1 flex-col
        xl:flex-row
        items-start
        xl:items-center
        gap-y-2
        xl:mr-6
      "
    >
      <label for="crud-form-1" class="form-label">Status</label>
      <select
        class="form-select w-full"
        aria-label="Default select example"
        v-model="search.status"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
    <button class="btn btn-primary shadow-md" @click="onSearch">
      <SearchIcon class="w-4 h-4 mr-2" /> Filter
    </button>
  </div>
  <!-- END: Filter -->
  <!-- <div class="grid grid-cols-12 gap-6 mt-5"> -->
  <!-- BEGIN: Data List -->
  <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
    <table class="table table-report -mt-2">
      <thead>
        <tr>
          <th class="whitespace-nowrap">NAME</th>
          <th class="text-center whitespace-nowrap">Price</th>
          <th class="text-center whitespace-nowrap">Limit per day</th>
          <th class="text-center whitespace-nowrap">Minimum buying</th>
          <th class="text-center whitespace-nowrap">STATUS</th>
          <th class="text-center whitespace-nowrap">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in dataList" :key="key" class="intro-x">
          <td>
            {{ item.name }}
          </td>
          <td class="text-center">
            {{ item.price }}
          </td>
          <td class="text-center">{{ item.amountLimitPerDay }}</td>
          <td class="text-center">{{ item.minimumBuy }}</td>
          <td class="w-40">
            <div
              class="flex items-center justify-center"
              :class="{
                'text-success': item.isActive,
                'text-danger': !item.isActive,
              }"
            >
              <CheckSquareIcon class="w-4 h-4 mr-2" />
              {{ item.isActive ? "Active" : "Inactive" }}
            </div>
          </td>
          <td class="table-report__action w-56">
            <div class="flex justify-center items-center">
              <router-link
                class="flex items-center mr-3"
                :to="{
                  name: 'ticket-detail',
                  params: {
                    mode: 'edit',
                    id: item.id,
                  },
                }"
              >
                <CheckSquareIcon class="w-4 h-4 mr-1" />
                Edit
              </router-link>
              <a
                class="flex items-center text-danger"
                href="javascript:;"
                @click="onDeleteConfirmOpen(item.id)"
              >
                <Trash2Icon class="w-4 h-4 mr-1" /> Delete
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- END: Data List -->
  <!-- BEGIN: Pagination -->
  <div
    class="
      intro-y
      col-span-12
      flex flex-wrap
      sm:flex-row sm:flex-nowrap
      items-center
    "
  >
    <nav class="w-full sm:w-auto sm:mr-auto">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="javascript:;" @click="onPageNav(1)">
            <ChevronsLeftIcon class="w-4 h-4" />
          </a>
        </li>
        <li class="page-item">
          <a
            class="page-link"
            href="javascript:;"
            @click="onPageNav(pagination.currentPage - 1)"
          >
            <ChevronLeftIcon class="w-4 h-4" />
          </a>
        </li>
        <li class="page-item">
          <span class="page-link">...</span>
        </li>
        <li
          class="page-item"
          v-for="(item, inx) in paginationNumber"
          :key="inx"
          :class="{ active: item.isActive }"
        >
          <a
            class="page-link"
            href="javascript:;"
            @click="onPageNav(item.numberOfPage)"
            >{{ item.numberOfPage }}</a
          >
        </li>
        <li class="page-item">
          <span class="page-link">...</span>
        </li>
        <li class="page-item">
          <a
            class="page-link"
            href="javascript:;"
            @click="onPageNav(pagination.currentPage + 1)"
          >
            <ChevronRightIcon class="w-4 h-4" />
          </a>
        </li>
        <li class="page-item">
          <a
            class="page-link"
            href="javascript:;"
            @click="onPageNav(pagination.numberOfPage)"
          >
            <ChevronsRightIcon class="w-4 h-4" />
          </a>
        </li>
      </ul>
    </nav>
    <select
      v-model="pagination.sltPerPage"
      class="w-20 form-select box mt-3 sm:mt-0"
    >
      <option :value="10">10</option>
      <option :value="25">25</option>
      <option :value="35">35</option>
      <option :value="50">50</option>
    </select>
  </div>
  <!-- END: Pagination -->
  <!-- </div> -->
  <!-- BEGIN: Delete Confirmation Modal -->
  <Modal
    :show="deleteConfirmationModal"
    @hidden="deleteConfirmationModal = false"
  >
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-3xl mt-5">Are you sure?</div>
        <div class="text-slate-500 mt-2">
          Do you really want to delete these records? <br />This process cannot
          be undone. {{ currentSelectDeleteId }}
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="deleteConfirmationModal = false"
          class="btn btn-outline-secondary w-24 mr-1"
        >
          Cancel
        </button>
        <button type="button" class="btn btn-danger w-24">Delete</button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Delete Confirmation Modal -->
</template>



<script lang="ts">
import TicketService from "../../service/ticket.service";
export default {
  data() {
    return {
      ticketService: new TicketService(this.$axios),
      deleteConfirmationModal: false,
      currentSelectDeleteId: undefined,
      dataList: undefined,
      search: { name: "", type: [], status: "active" },
      pagination: {
        sltPerPage: 10,
        currentPage: 5,
        numberOfPage: 10,
      },
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
          this.dataList = result.data.data;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    onDeleteConfirmOpen(id) {
      this.currentSelectDeleteId = id;
      this.deleteConfirmationModal = true;
    },
    onNew() {
      this.$router.push({
        name: "ticket-detail",
        params: {
          mode: "new",
        },
      });
    },
    onSearch() {
      console.log(this.inputSearch);
    },
    onPageNav(numOfPage) {
      this.pagination.currentPage = numOfPage;
    },
  },
  computed: {
    paginationNumber() {
      if (this.pagination.currentPage == 1) {
        return [
          {
            numberOfPage: 1,
            isActive: true,
          },
          {
            numberOfPage: 2,
            isActive: false,
          },
          {
            numberOfPage: 3,
            isActive: false,
          },
        ];
      }
      if (this.pagination.currentPage == this.pagination.numberOfPage) {
        return [
          {
            numberOfPage: this.pagination.currentPage - 2,
            isActive: false,
          },
          {
            numberOfPage: this.pagination.currentPage - 1,
            isActive: false,
          },
          {
            numberOfPage: this.pagination.currentPage,
            isActive: true,
          },
        ];
      }

      return [
        {
          numberOfPage: this.pagination.currentPage - 1,
          isActive: false,
        },
        {
          numberOfPage: this.pagination.currentPage,
          isActive: true,
        },
        {
          numberOfPage: this.pagination.currentPage + 1,
          isActive: false,
        },
      ];
    },
  },
};
</script>
