

<template>
  <!-- <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">
      Conversation {{ $route.params.id }}
    </h2>
  </div> -->
  <div class="grid grid-cols-12 gap-5 mt-5">
    <!-- BEGIN: Chat Content -->
    <div class="col-span-12 xl:col-span-8 2xl:col-span-9">
      <div class="box intro-y">
        <!-- BEGIN: Chat Active -->
        <div class="h-[768px] flex flex-col">
          <div
            class="
              flex flex-col
              sm:flex-row
              border-b border-slate-200/60
              dark:border-darkmode-400
              px-5
              py-4
            "
          >
            <div class="flex items-center">
              <div class="ml-3 mr-auto">
                <div class="flex items-center">
                  <ArrowLeftIcon class="w-4 h-4 mr-4" />
                  <div class="font-medium text-base">
                    {{ $f()[0].users[0].name }}
                  </div>
                  <div
                    class="
                      flex
                      items-center
                      px-2
                      py-0.5
                      text-xs
                      ml-2
                      bg-success/20
                      border border-success/20
                      text-success
                      rounded-md
                    "
                  >
                    <div
                      class="w-1.5 h-1.5 bg-success rounded-full mr-1.5"
                    ></div>
                    Online
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1">
            <div class="flex items-end float-left mb-10">
              <div class="-mb-6">
                <div
                  class="
                    bg-slate-100
                    border border-slate-200/60
                    dark:bg-darkmode-400
                    px-4
                    py-3
                    text-slate-500
                    rounded-md
                  "
                >
                  Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor
                </div>
                <div class="mt-2 text-xs text-slate-500">2 mins ago</div>
              </div>
            </div>
            <div class="clear-both"></div>
            <div class="flex items-end float-right mb-10">
              <div class="-mb-6">
                <div class="bg-primary px-4 py-3 text-white rounded-md">
                  Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor
                </div>
                <div class="mt-2 text-xs text-slate-500">1 mins ago</div>
              </div>
            </div>
            <div class="clear-both"></div>
            <div
              class="
                text-slate-400
                dark:text-slate-500
                text-xs text-center
                mb-10
                mt-5
              "
            >
              12 June 2020
            </div>
            <div class="flex items-end float-left mb-10">
              <div class="-mb-6">
                <div
                  class="
                    bg-slate-100
                    dark:bg-darkmode-400
                    px-4
                    py-3
                    text-slate-500
                    rounded-md
                  "
                >
                  Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor
                </div>
                <div class="mt-2 text-xs text-slate-500">10 secs ago</div>
              </div>
            </div>
            <div class="clear-both"></div>
            <div class="flex items-end float-right mb-10">
              <div class="-mb-6">
                <div class="bg-primary px-4 py-3 text-white rounded-md">
                  Lorem ipsum
                </div>
                <div class="mt-2 text-xs text-slate-500">1 secs ago</div>
              </div>
            </div>
          </div>
          <div
            class="
              pt-4
              pb-10
              sm:py-4
              flex
              items-center
              border-t border-slate-200/60
              dark:border-darkmode-400
            "
          >
            <textarea
              class="
                h-[46px]
                form-control
                dark:bg-darkmode-600
                h-16
                resize-none
                border-transparent
                px-5
                py-3
                shadow-none
                focus:border-transparent focus:ring-0
              "
              rows="1"
              placeholder="Type your message..."
            ></textarea>
            <div
              class="
                flex
                absolute
                sm:static
                left-0
                bottom-0
                ml-5
                sm:ml-0
                mb-5
                sm:mb-0
              "
            >
              <div
                class="
                  w-4
                  h-4
                  sm:w-5 sm:h-5
                  relative
                  text-slate-500
                  mr-3
                  sm:mr-5
                "
              >
                <!-- <PaperclipIcon class="w-full h-full" /> -->
                <input
                  type="file"
                  class="w-full h-full top-0 left-0 absolute opacity-0"
                />
              </div>
            </div>
            <a
              href="javascript:;"
              class="
                w-8
                h-8
                sm:w-10 sm:h-10
                block
                bg-primary
                text-white
                rounded-full
                flex-none flex
                items-center
                justify-center
                mr-5
              "
            >
              <SendIcon class="w-4 h-4" />
            </a>
          </div>
        </div>
        <!-- END: Chat Active -->
      </div>
    </div>
    <!-- END: Chat Content -->

    <!-- BEGIN: Chat Side Menu -->
    <div class="col-span-12 xl:col-span-4 2xl:col-span-3" v-if="issueData">
      <div class="box p-5 cursor-pointer mt-5 first:mt-0">
        <div class="flex items-center">
          <div class="w-2 h-2 bg-warning rounded-full mr-3"></div>
          <div class="event__title font-medium truncate">Issue information</div>
          <InfoIcon class="w-4 h-4 text-slate-500 ml-auto" />
        </div>
        <div
          class="
            border-b border-t border-slate-200/60
            dark:border-darkmode-400
            py-5
            my-5
          "
        >
          <div class="flex items-center">
            <TypeIcon class="w-4 h-4 text-slate-500 mr-2" />
            {{ issueData.subject }}
          </div>
          <div class="flex items-center">
            <TypeIcon class="w-4 h-4 text-slate-500 mr-2" />
            {{ issueData.description }}
          </div>
          <div class="flex items-center">
            <UserIcon class="w-4 h-4 text-slate-500 mr-2" />
            Requestor :
            {{ issueData.RequestFrom.firstName }}
            {{ issueData.RequestFrom.lastName }}
          </div>
          <div class="flex items-center">
            <UserIcon class="w-4 h-4 text-slate-500 mr-2" />
            Operator :
            {{ issueData.AssignTo.firstName }}
            {{ issueData.AssignTo.lastName }}
          </div>
          <div class="flex items-center">
            <CalendarIcon class="w-4 h-4 text-slate-500 mr-2" />
            <!-- 02 February 2022 -->
            {{ issueData.createAt }}
          </div>
        </div>
        <div class="flex" v-if="!isClosed">
          <button
            class="btn btn-outline-success py-1 px-2 ml-auto"
            @click="setIssueStatus('Close')"
          >
            <CheckIcon class="w-4 h-4 mr-2" />
            Close issue
          </button>
          <button
            v-if="!isHold"
            class="btn btn-outline-warning py-1 px-2 ml-auto"
            @click="setIssueStatus('Hold')"
          >
            <ArchiveIcon class="w-4 h-4 mr-2" />
            Hold issue
          </button>
        </div>
      </div>
      <!-- BEGIN: Status Timeline -->
      <div v-if="issueData != undefined">
        <div class="intro-x flex items-center h-10 mt-4">
          <h2 class="text-lg font-medium truncate mr-5">Status Timeline</h2>
        </div>
        <div class="mt-4">
          <div
            v-for="(items, key) in issueData.IssueStatusTransaction"
            :key="key"
            class="intro-x"
          >
            <div class="box px-5 py-3 flex items-center zoom-in mb-3">
              <div class="mr-auto">
                <div class="font-medium">
                  {{ items.IssueStatus.name }}
                </div>
                <div class="text-slate-500 text-xs mt-1">
                  {{ items.createAt }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Status Timeline -->
    </div>
    <!-- END: Chat Side Menu -->
  </div>
</template>

<script lang="ts">
import IssueStatusService from "../../service/issue_status.service";
import IssueService from "../../service/issue.service";
export default {
  data() {
    return {
      issueService: new IssueService(this.$axios),
      issueStatusService: new IssueStatusService(this.$axios),
      issueStatusList: [],
      issueData: undefined,
    };
  },
  mounted() {
    if (isNaN(this.$route.params.id)) {
      alert("parameter is not integers");
      this.$router.push({ name: "my-issue" });
      return;
    }

    this.getIssue();
    this.getIssueStatus();
  },
  methods: {
    getIssue() {
      this.issueService
        .getIssueById(this.$route.params.id)
        .then((result) => {
          this.issueData = result.data.data;
          if (result.data.data.IssueStatusTransaction.length == 1) {
            this.setIssueStatus("In Process");
          }
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
    setIssueStatus(status) {
      const statusId = this.issueStatusList.find((x) => x.name == status).id;
      this.issueService
        .updateStatusIssue(this.$route.params.id, statusId)
        .then((result) => {
          this.getIssue();
        })
        .catch((e) => alert(e.response.data.message));
    },
  },
  computed: {
    isHold() {
      return (
        this.issueData.IssueStatusTransaction.findIndex(
          (x) => x.IssueStatus.name == "Hold"
        ) > -1
      );
    },
    isClosed() {
      return (
        this.issueData.IssueStatusTransaction.findIndex(
          (x) => x.IssueStatus.name == "Close"
        ) > -1
      );
    },
  },
};
</script>