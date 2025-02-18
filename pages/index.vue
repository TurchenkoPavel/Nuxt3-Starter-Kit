<template>
  <div class="flex justify-center items-center h-[80vh]">
    <div>
      <!-- Main Heading -->
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Build Secure Websites Faster <br /> with Nuxt 3 & SQLite
      </h1>

      <!-- Subheading -->
      <p class="text-lg md:text-xl text-gray-600 mb-8">
        Simplify authentication, role-based permissions, and database integration for your next project.
      </p>

      <p class="text-lg md:text-xl text-orange-500 mb-8 font-bold">
        Have questions or want to contribute to this open-source initiative?
      </p>

      <!-- Email Form -->
      <div class="flex flex-col md:flex-row items-center gap-4 w-full max-w-lg">
        <input
          type="email"
          placeholder="Enter your email to get started"
          class="flex-1 px-4 py-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
        <Button
          class=" text-white font-medium px-6 py-3 rounded-md shadow-lg transition"
          severity="help"
        >
          Join the Community
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>
