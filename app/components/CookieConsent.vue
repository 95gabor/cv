<template>
  <div v-if="!hasConsent" class="cookie-banner">
    <div class="cookie-content">
      <p>
        This website uses cookies to analyze site traffic and improve your experience. By continuing to use this site,
        you agree to our use of cookies.
      </p>
      <div class="cookie-buttons">
        <UButton color="primary" @click="acceptCookies">Accept</UButton>
        <UButton color="gray" variant="ghost" @click="declineCookies">Decline</UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const hasConsent = ref(true);

// Check if user has already made a choice
onMounted(() => {
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) {
    hasConsent.value = false;
  }
});

const acceptCookies = () => {
  localStorage.setItem('cookie-consent', 'accepted');
  hasConsent.value = true;
  // Enable Google Analytics
  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
  });
};

const declineCookies = () => {
  localStorage.setItem('cookie-consent', 'declined');
  hasConsent.value = true;
  // Disable Google Analytics
  window.gtag('consent', 'update', {
    analytics_storage: 'denied',
  });
};
</script>

<style lang="scss" scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  padding: 1rem;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.cookie-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  p {
    margin: 0;
    color: white;
    flex: 1;
    min-width: 300px;
  }
}

.cookie-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
