

<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">
      Conversation {{ $route.params.id }}
    </h2>
  </div>
  <div class="grid grid-cols-12 gap-5 mt-5">
    <!-- BEGIN: Chat Side Menu -->
    <div class="col-span-12 xl:col-span-4 2xl:col-span-3">
      <div class="box intro-y">
        <div class="pb-5 px-5 mt-5">
          <div class="relative">
            <input
              type="text"
              class="form-control py-3 px-4 pl-10"
              placeholder="Search for messages or users..."
            />
            <SearchIcon
              class="
                w-5
                h-5
                absolute
                inset-y-0
                left-0
                my-auto
                text-slate-400
                ml-3
              "
            />
          </div>
        </div>
        <div class="h-[642px] overflow-y-auto scrollbar-hidden">
          <div
            v-for="(faker, fakerKey) in $_.take($f(), 7)"
            :key="fakerKey"
            class="
              cursor-pointer
              flex
              items-start
              border-b border-t border-slate-200/60
              dark:border-darkmode-400
              hover:bg-slate-50
              dark:hover:bg-darkmode-400/50
              py-5
              px-5
              -mb-px
              last:border-b-0
            "
            :class="{
              'z-10 relative bg-slate-100/80 dark:bg-darkmode-400 hover:bg-slate-100/80 dark:hover:bg-darkmode-400':
                fakerKey == 1,
            }"
          >
            <div class="w-12 h-12 flex-none image-fit mr-1">
              <img
                alt="Rocketman - HTML Admin Template"
                class="rounded-full"
                :src="faker.photos[0]"
              />
              <div
                v-if="faker.trueFalse[0]"
                class="
                  w-3
                  h-3
                  bg-success
                  absolute
                  right-0
                  bottom-0
                  rounded-full
                  border-2 border-white
                  dark:border-darkmode-600
                "
              ></div>
            </div>
            <div class="ml-2 overflow-hidden flex-1">
              <div class="flex items-center">
                <a href="javascript:;" class="font-medium">{{
                  faker.users[0].name
                }}</a>
                <div class="text-xs text-slate-500 ml-auto">
                  {{ faker.times[0] }}
                </div>
              </div>
              <div class="w-full truncate text-xs text-slate-500 mt-0.5">
                {{ faker.users[0].username }}
              </div>
              <div class="flex mt-2">
                <div class="flex-1 mr-3 truncate">
                  {{ faker.news[0].shortContent }}
                </div>
                <div
                  v-if="faker.trueFalse[0]"
                  class="
                    w-5
                    h-5
                    flex
                    items-center
                    justify-center
                    text-xs text-white
                    rounded-full
                    bg-primary
                    font-medium
                    -mt-1
                  "
                >
                  {{ faker.notificationCount }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Chat Side Menu -->
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
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit relative"
              >
                <img
                  alt="Rocketman - HTML Admin Template"
                  class="rounded-full"
                  :src="$f()[0].photos[0]"
                />
              </div>
              <div class="ml-3 mr-auto">
                <div class="flex items-center">
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
                <div class="mt-0.5 text-slate-500 text-xs sm:text-sm">
                  Project Manager
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1">
            <div class="flex items-end float-left mb-10">
              <div
                class="
                  w-10
                  h-10
                  hidden
                  sm:block
                  flex-none
                  image-fit
                  relative
                  mr-5
                "
              >
                <img
                  alt="Rocketman - HTML Admin Template"
                  class="rounded-full"
                  :src="$f()[0].photos[0]"
                />
              </div>
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
              <Dropdown class="hidden sm:block ml-3 my-auto">
                <DropdownToggle
                  tag="a"
                  class="w-4 h-4 text-slate-500"
                  href="javascript:;"
                >
                  <MoreVerticalIcon class="w-4 h-4" />
                </DropdownToggle>
                <DropdownMenu class="w-40">
                  <DropdownContent>
                    <DropdownItem
                      ><CornerUpLeftIcon class="w-4 h-4 mr-2" />
                      Reply</DropdownItem
                    >
                    <DropdownItem
                      ><TrashIcon class="w-4 h-4 mr-2" /> Delete</DropdownItem
                    >
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="clear-both"></div>
            <div class="flex items-end float-right mb-10">
              <Dropdown class="hidden sm:block mr-3 my-auto">
                <DropdownToggle
                  tag="a"
                  class="w-4 h-4 text-slate-500"
                  href="javascript:;"
                >
                  <MoreVerticalIcon class="w-4 h-4" />
                </DropdownToggle>
                <DropdownMenu class="w-40">
                  <DropdownContent>
                    <DropdownItem
                      ><CornerUpLeftIcon class="w-4 h-4 mr-2" />
                      Reply</DropdownItem
                    >
                    <DropdownItem
                      ><TrashIcon class="w-4 h-4 mr-2" /> Delete</DropdownItem
                    >
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
              <div class="-mb-6">
                <div class="bg-primary px-4 py-3 text-white rounded-md">
                  Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor
                </div>
                <div class="mt-2 text-xs text-slate-500">1 mins ago</div>
              </div>
              <div
                class="
                  w-10
                  h-10
                  hidden
                  sm:block
                  flex-none
                  image-fit
                  relative
                  ml-5
                "
              >
                <img
                  alt="Rocketman - HTML Admin Template"
                  class="rounded-full"
                  :src="$f()[1].photos[0]"
                />
              </div>
            </div>
            <div class="clear-both"></div>
            <div class="flex items-end float-right mb-10">
              <Dropdown class="hidden sm:block mr-3 my-auto">
                <DropdownToggle
                  tag="a"
                  class="w-4 h-4 text-slate-500"
                  href="javascript:;"
                >
                  <MoreVerticalIcon class="w-4 h-4" />
                </DropdownToggle>
                <DropdownMenu class="w-40">
                  <DropdownContent>
                    <DropdownItem
                      ><CornerUpLeftIcon class="w-4 h-4 mr-2" />
                      Reply</DropdownItem
                    >
                    <DropdownItem
                      ><TrashIcon class="w-4 h-4 mr-2" /> Delete</DropdownItem
                    >
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
              <div class="-mb-6">
                <div class="bg-primary px-4 py-3 text-white rounded-md">
                  Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor
                </div>
                <div class="mt-2 text-xs text-slate-500">59 secs ago</div>
              </div>
              <div
                class="
                  w-10
                  h-10
                  hidden
                  sm:block
                  flex-none
                  image-fit
                  relative
                  ml-5
                "
              >
                <img
                  alt="Rocketman - HTML Admin Template"
                  class="rounded-full"
                  :src="$f()[1].photos[0]"
                />
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
              <div
                class="
                  w-10
                  h-10
                  hidden
                  sm:block
                  flex-none
                  image-fit
                  relative
                  mr-5
                "
              >
                <img
                  alt="Rocketman - HTML Admin Template"
                  class="rounded-full"
                  :src="$f()[0].photos[0]"
                />
              </div>
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
              <Dropdown class="hidden sm:block ml-3 my-auto">
                <DropdownToggle
                  tag="a"
                  class="w-4 h-4 text-slate-500"
                  href="javascript:;"
                >
                  <MoreVerticalIcon class="w-4 h-4" />
                </DropdownToggle>
                <DropdownMenu class="w-40">
                  <DropdownContent>
                    <DropdownItem
                      ><CornerUpLeftIcon class="w-4 h-4 mr-2" />
                      Reply</DropdownItem
                    >
                    <DropdownItem
                      ><TrashIcon class="w-4 h-4 mr-2" /> Delete</DropdownItem
                    >
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="clear-both"></div>
            <div class="flex items-end float-right mb-10">
              <Dropdown class="hidden sm:block mr-3 my-auto">
                <DropdownToggle
                  tag="a"
                  class="w-4 h-4 text-slate-500"
                  href="javascript:;"
                >
                  <MoreVerticalIcon class="w-4 h-4" />
                </DropdownToggle>
                <DropdownMenu class="w-40">
                  <DropdownContent>
                    <DropdownItem
                      ><CornerUpLeftIcon class="w-4 h-4 mr-2" />
                      Reply</DropdownItem
                    >
                    <DropdownItem
                      ><TrashIcon class="w-4 h-4 mr-2" /> Delete</DropdownItem
                    >
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
              <div class="-mb-6">
                <div class="bg-primary px-4 py-3 text-white rounded-md">
                  Lorem ipsum
                </div>
                <div class="mt-2 text-xs text-slate-500">1 secs ago</div>
              </div>
              <div
                class="
                  w-10
                  h-10
                  hidden
                  sm:block
                  flex-none
                  image-fit
                  relative
                  ml-5
                "
              >
                <img
                  alt="Rocketman - HTML Admin Template"
                  class="rounded-full"
                  :src="$f()[1].photos[0]"
                />
              </div>
            </div>
            <div class="clear-both"></div>
            <div class="flex items-end float-left mb-10">
              <div
                class="
                  w-10
                  h-10
                  hidden
                  sm:block
                  flex-none
                  image-fit
                  relative
                  mr-5
                "
              >
                <img
                  alt="Rocketman - HTML Admin Template"
                  class="rounded-full"
                  :src="$f()[0].photos[0]"
                />
              </div>
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
                  {{ $f()[0].users[0].name }} is typing
                  <span class="typing-dots ml-1">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </div>
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
                <PaperclipIcon class="w-full h-full" />
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
  </div>
</template>
