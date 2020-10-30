export const bookTemplate = `
<a class="book__link" href="#">
              <div class="books__buttons">
                <button class="btn">Удалить</button>
                <button class="btn">Изменить</button>
              </div>
              <div class="books__wrapper">
                <div class="book__item">
                  <img class="book__img" src="img/algoritm.jpg" alt="">
                </div>
                  <div class="books__info">
                  <p class="title__book"></p>
                  <p class="book__author"></p>
                  <p class="book__pages"></p>
                  <p class="book__quality"></p>
                  <p class="book__language"></p>
                  <p class="publishing__date"></p>
                  <div class="block__description">
                    <b>
                      <p class="description__name">Описание:</p>
                    </b>
                    <p class="description__text"></p>
                  </div>
                </div>
              </div>
            </a>`;