<template>
  <div class="container">
    <DarkModeSwitcher />
    <MainColorSwitcher />
    <div
      class="w-full min-h-screen p-5 md:p-20 flex items-center justify-center"
    >
      <div class="w-96 intro-y">
        <img
          class="mx-auto w-16"
          alt="Rocketman - Tailwind HTML Admin Template"
          src="@/assets/images/logo.svg"
        />
        <div
          class="
            text-white
            dark:text-slate-300
            text-2xl
            font-medium
            text-center
            mt-14
          "
        >
          Login to Your Account!
        </div>
        <div
          class="
            box
            px-5
            py-8
            mt-10
            max-w-[450px]
            relative
            before:content-['']
            before:z-[-1]
            before:w-[95%]
            before:h-full
            before:bg-slate-200
            before:border
            before:border-slate-200
            before:-mt-5
            before:absolute
            before:rounded-lg
            before:mx-auto
            before:inset-x-0
            before:dark:bg-darkmode-600/70
            before:dark:border-darkmode-500/60
          "
        >
          <select
            class="form-control py-3 px-4 block"
            v-model="loginForm.dummySelected"
            @change="dummyChange"
          >
            <option v-for="(item, inx) in dummyUser" :key="inx" :value="inx">
              {{ item.email }}
            </option>
          </select>
          <input
            type="text"
            class="form-control py-3 px-4 block mt-4"
            placeholder="Email"
            v-model="loginForm.email"
          />
          <input
            type="password"
            class="form-control py-3 px-4 block mt-4"
            placeholder="Password"
            v-model="loginForm.password"
          />
          <div class="text-slate-500 flex text-xs sm:text-sm mt-4">
            <div class="flex items-center mr-auto">
              <input
                type="checkbox"
                class="form-check-input border mr-2"
                id="remember-me"
              />
              <label class="cursor-pointer select-none" for="remember-me"
                >Remember me</label
              >
            </div>
            <a href="">Forgot Password?</a>
          </div>
          <div class="mt-5 xl:mt-8 text-center xl:text-left">
            <button class="btn btn-primary w-full xl:mr-3" @click="login">
              Login
            </button>
            <!-- <button class="btn btn-outline-secondary w-full mt-3">
              Sign up
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      dummyUser: [
        {
          email: "superadmin@dummy.com",
          password: "12345678",
        },
        {
          email: "supporter@dummy.com",
          password: "12345678",
        },
        {
          email: "ticketmanager@dummy.com",
          password: "12345678",
        },
        {
          email: "client@dummy.com",
          password: "12345678",
        },
      ],
      loginForm: {
        dummySelected: 0,
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    this.dummyChange();
  },
  methods: {
    dummyChange() {
      this.loginForm.email = this.dummyUser[this.loginForm.dummySelected].email;
      this.loginForm.password =
        this.dummyUser[this.loginForm.dummySelected].password;
    },
    login() {
      console.log(this.$axios);
      this.$axios
        .post("/login", {
          email: this.loginForm.email,
          password: this.loginForm.password,
        })
        .then((result) => {
          localStorage.setItem("token", result.data.data.token.token);
          this.$router.push({
            name: "dashboard",
          });
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>
