<template>
  <q-page class="pagina-jogo">
    <div class="capa-jogo">
      <img
        src="/capa-30-segundos.png"
        alt="Jogo 30 Segundos"
        class="imagem-capa"
      />

      <q-btn
        label="COMEÇAR A JOGAR"
        color="amber"
        text-color="dark"
        size="lg"
        unelevated
        rounded
      />
    </div>
  </q-page>
</template>

<style scoped>
.pagina-jogo {
  background: #061333;
  min-height: 100vh;
  padding: 20px;
}

.capa-jogo {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.imagem-capa {
  width: 100%;
  max-width: 600px;
  height: auto;
  object-fit: contain;
  border-radius: 20px;
  box-shadow: 0 0 35px rgba(0, 153, 255, 0.3);
}
</style>
