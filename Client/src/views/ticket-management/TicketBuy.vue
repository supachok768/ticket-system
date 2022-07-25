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
      v-for="(faker, fakerKey) in $f()"
      :key="fakerKey"
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
          {{
            faker.files[0].fileName.split("/")[
              faker.files[0].fileName.split("/").length - 1
            ]
          }}
        </p>
        <div class="text-slate-500 text-xs text-center mt-0.5">
          Remaining amount : 10
        </div>
        <div class="text-slate-500 text-xs text-center mt-0.5">
          Minimum buying : 2
        </div>
        <div class="flex justify-center mt-3 text-center">
          <button class="btn btn-outline-primary font-small">
            <MinusIcon class="w-3 h-3" />
          </button>
          <p class="p-2 mr-3 ml-3">0</p>
          <button class="btn btn-outline-primary font-small">
            <PlusIcon class="w-3 h-3" />
          </button>
        </div>
        <div class="mt-3 text-center">
          <button type="submit" class="btn btn-primary pr-10 pl-10">Buy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>