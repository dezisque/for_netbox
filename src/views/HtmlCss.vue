<template>
  <div class="container">
    <router-link class="back" to="/">Back to main!</router-link>
    <div class="info__block">
      <div class="info__wrapper">
        <div class="info__text">
          <p>
            Базовые сценарии поведения пользователей освещают чрезвычайно
            интересные особенности картины в целом, однако конкретные выводы,
            разумеется, своевременно верифицированы. Также как
            социально-экономическое развитие способствует повышению качества
            системы массового участия.
          </p>
          <p>
            Принимая во внимание показатели успешности, высококачественный
            прототип будущего проекта в значительной степени обусловливает
            важность новых принципов формирования материально-технической и
            кадровой базы.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HtmlCss",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&subset=cyrillic");
.back {
  position: relative;
  z-index: 2;
  font-size: 1.2em;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}
.info__block {
  position: relative;
  width: 50vw;
  height: 32vw;
  border-radius: 6vw;
  border: 4px solid #ffbb89;
  background: linear-gradient(29.97deg, #000000 -12.89%, #363636 91.62%);
}
.info__wrapper {
  overflow-y: scroll;
  height: 100%;
  margin: 0 3vw;
}
.info__block:before {
  content: "";
  display: block;
  position: absolute;
  left: calc(50% - 16vw);
  top: -4.5vw;
  background-color: #fff;
  width: 32vw;
  height: 9vw;
  border-radius: 6vw;
  border: 4px solid #ffbb89;
}
.info__block:after {
  content: "";
  display: block;
  position: absolute;
  left: calc(50% - 17vw);
  top: calc((4.5vw + 4px) * -1);
  background-color: #fff;
  width: 34vw;
  height: 4.5vw;
}

.info__text {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: normal;
  font-size: 1.4vw;
  line-height: 165%;
  text-align: left;
  color: #fff;
  padding: 6vw 3vw;
}

.info__wrapper::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.15);
  margin: 4vw 0;
}

.info__wrapper::-webkit-scrollbar {
  width: 4px;
}

.info__wrapper::-webkit-scrollbar-thumb {
  background-color: #fff;
}

@media screen and (max-width: 415px) {
  .info__block:before {
    display: none;
  }
  .info__block {
    width: 80vw;
    height: 128vw;
    border-radius: 14vw;
  }
  .info__text {
    font-size: 3.5vw;
    padding: 14vw 4vw;
  }
  .info__wrapper {
    margin: 0 4vw;
  }
  .info__wrapper::-webkit-scrollbar {
    width: 4px;
  }
  .info__wrapper::-webkit-scrollbar-track {
    margin: 12vw 0;
  }
}
</style>