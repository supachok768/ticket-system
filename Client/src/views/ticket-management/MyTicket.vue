<template>
  <h2 class="intro-y text-lg font-medium mt-10">My Ticket</h2>
  <div
    class="
      intro-y
      col-span-12
      flex
      justify-end
      flex-wrap
      sm:flex-nowrap
      items-center
      mt-2
    "
  >
    <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
      <button class="btn btn-primary shadow-md mr-2" @click="onBuy">
        Buy ticket
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
      <label for="crud-form-2" class="form-label">Category</label>
      <TomSelect
        id="crud-form-2"
        v-model="search.type"
        class="w-full flex-1"
        multiple
      >
        <option
          v-for="(faker, fakerKey) in $f()"
          :key="fakerKey"
          :value="faker.products[0].category"
        >
          {{ faker.products[0].category }}
        </option>
      </TomSelect>
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
          <th class="text-center whitespace-nowrap">QTY</th>
          <th class="text-center whitespace-nowrap">STATUS</th>
          <th class="text-center whitespace-nowrap">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in dataList" :key="key" class="intro-x">
          <td>
            <a href="" class="font-medium whitespace-nowrap">{{
              item.ticket.name
            }}</a>
          </td>
          <td class="text-center">{{ item.qty }}</td>
          <td class="w-40">
            <div
              class="flex items-center justify-center"
              :class="{
                'text-success': item.ticket.isActive,
                'text-danger': !item.ticket.isActive,
              }"
            >
              <CheckSquareIcon class="w-4 h-4 mr-2" />
              {{ item.ticket.isActive ? "Active" : "Inactive" }}
            </div>
          </td>
          <td class="table-report__action w-56">
            <div class="flex justify-center items-center">
              <!-- <a
                class="flex items-center mr-3"
                href="javascript:;"
                @click="onView(fakerKey)"
              >
                <EyeIcon class="w-4 h-4 mr-1" />
                View
              </a> -->
              <a
                class="flex items-center text-danger"
                href="javascript:;"
                @click="onIssueOpen(item.ticket.id)"
              >
                <NavigationIcon class="w-4 h-4 mr-1" /> Use
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
  <!-- BEGIN: View Modal -->
  <Modal :show="informationModal" @hidden="informationModal = false">
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
          @click="informationModal = false"
          class="btn btn-outline-secondary w-24 mr-1"
        >
          OK
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: View Modal -->
  <!-- BEGIN: Issue Information Modal -->
  <Modal :show="openIssueModal" @hidden="openIssueModal = false">
    <ModalBody class="p-0">
      <div class="p-5">
        <div class="text-3xl mt-5 text-center">Issue Information</div>
        <div class="text-slate-500 mt-2">
          <PreviewComponent class="intro-y box">
            <div class="p-5">
              <Preview>
                <div>
                  <label for="issueFormSubject" class="form-label"
                    >Subject</label
                  >
                  <input
                    id="issueFormSubject"
                    type="text"
                    class="form-control"
                    placeholder="Input text"
                    v-model="issueInformation.subject"
                  />
                </div>
                <div class="mt-3">
                  <label for="issueFormAssignTo" class="form-label"
                    >Assign to</label
                  >
                  <TomSelect
                    id="issueFormAssignTo"
                    v-model="issueInformation.assignTo"
                    :options="{
                      placeholder: 'Select your favorite actors',
                    }"
                    class="w-full"
                  >
                    <option
                      v-for="(item, key) in usersList"
                      :key="key"
                      :value="item.id"
                    >
                      {{ item.firstName }}
                      {{ item.lastName }}
                    </option>
                  </TomSelect>
                </div>
                <div class="mt-3">
                  <label for="issueFormStatus" class="form-label">Status</label>
                  <TomSelect
                    id="issueFormStatus"
                    v-model="issueInformation.status"
                    :options="{
                      placeholder: 'Select your favorite actors',
                    }"
                    class="w-full"
                    disabled
                  >
                    <option
                      v-for="(item, key) in issueStatusList"
                      :key="key"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </TomSelect>
                </div>
                <div class="mt-3">
                  <label for="issueFormTicket" class="form-label">Ticket</label>
                  <select
                    id="issueFormTicket"
                    v-model="issueInformation.ticket"
                    class="w-full"
                    disabled
                  >
                    <option
                      v-for="(item, key) in ticketList"
                      :key="key"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
                <div class="mt-3">
                  <label for="issueFormDes" class="form-label"
                    >Desciption</label
                  >
                  <textarea
                    id="issueFormDes"
                    v-model="issueInformation.description"
                    rows="3"
                    class="form-control"
                    style="resize: none"
                  ></textarea>
                </div>
              </Preview>
            </div>
          </PreviewComponent>
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="openIssueModal = false"
          class="btn btn-outline-secondary w-24 mr-1"
        >
          Cancel
        </button>
        <button type="button" class="btn btn-primary w-24" @click="onIssueSave">
          Save
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Issue Information Modal -->
</template>



<script lang="ts">
import InventoryService from "../../service/inventory.service";
import TicketService from "../../service/ticket.service";
import UsersService from "../../service/users.service";
import IssueStatusService from "../../service/issue_status.service";
import IssueService from "../../service/issue.service";
export default {
  data() {
    return {
      ticketService: new TicketService(this.$axios),
      inventoryService: new InventoryService(this.$axios),
      userService: new UsersService(this.$axios),
      issueStatusService: new IssueStatusService(this.$axios),
      issueService: new IssueService(this.$axios),
      informationModal: false,
      openIssueModal: false,
      currentSelectDeleteId: undefined,
      dataList: [],
      ticketList: [],
      usersList: [],
      issueStatusList: [],
      search: { name: "", type: [], status: "active" },
      issueInformation: {
        subject: "",
        assignTo: "",
        status: "",
        ticket: "",
        description: "",
      },
      pagination: {
        sltPerPage: 10,
        currentPage: 5,
        numberOfPage: 10,
      },
    };
  },
  mounted() {
    this.getInventory();
    this.getTicket();
    this.getUsers();
    this.getIssueStatus();
  },
  methods: {
    getInventory() {
      this.inventoryService
        .getInventory()
        .then((result) => {
          this.dataList = result.data.data.filter((x) => x.qty > 0);
        })
        .catch((e) => alert(e.response.data.message));
    },
    getTicket() {
      this.ticketService
        .getTicket()
        .then((result) => {
          this.ticketList = result.data.data;
        })
        .catch((e) => alert(e.response.data.message));
    },
    getUsers() {
      this.userService
        .getUsers()
        .then((result) => {
          console.log(result.data.data);
          this.usersList = result.data.data;
        })
        .catch((e) => alert(e.response.data.message));
    },
    getIssueStatus() {
      this.issueStatusService
        .getIssueStatus()
        .then((result) => {
          this.issueStatusList = result.data.data;
        })
        .catch((e) => alert(e.response.data.message));
    },
    onIssueOpen(id) {
      this.issueInformation.subject = "";
      this.issueInformation.assignTo = this.usersList[0].id;
      this.issueInformation.status = this.issueStatusList.find(
        (x) => x.name == "Open"
      ).id;
      this.issueInformation.ticket = id;
      this.issueInformation.description = "";
      this.openIssueModal = true;
    },
    onIssueSave() {
      this.issueService
        .openIssue(
          this.issueInformation.subject,
          this.issueInformation.description,
          this.issueInformation.assignTo,
          this.issueInformation.ticket,
          this.issueInformation.status
        )
        .then((result) => {
          //
        })
        .catch((e) => alert(e.response.data.message));
    },
    // onView(id) {
    //   this.currentSelectDeleteId = id;
    //   this.informationModal = true;
    // },
    onBuy() {
      this.$router.push({
        name: "ticket-buy",
      });
    },
    onSearch() {
      console.log(this.search);
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
