import { SETTINGS, GameManager, soundFiles } from '../gameSettings/settings';
import laser from '../../assets/static/images/laser.png';
import Bullet from '../Bullet/Bullet';
import Point from '../Point/Point';
import sound from '../soundManage/Sound';

class BulletCollection {
  constructor(player) {
    this.listBullets = [];
    this.lastAdded = 0;
    this.player = player;
    this.total_bullets = 0;
  }

  reset() {
    for (let i = 0; i < this.listBullets.length; ++i) {
      this.listBullets[i].remove();
    }

    this.listBullets = [];
    this.lastAdded = 0;
    this.total_bullets = 0;
  }

  update(dt, fire) {
    // берем массив объектов пуль и начинаем обход с конца
    for (let i = this.listBullets.length - 1; i >= 0; --i) {
      // если у объекта Пуля значение dead = true, т.е. у пули закончилось время жизни на игровом поле
      if (this.listBullets[i].dead === true) {
        // тогда вырезаем из массива Пуль конкертно эту Пулю
        this.listBullets.splice(i, 1);
      } else {
        // иначе опять начинаем проверку сначала
        this.listBullets[i].update(dt);
      }
    }
    // увеличиваем время с того времени как была добавлена последняя Пуля
    this.lastAdded += dt;

    // если игрок не мигает после попадания и время последней добавленной в массив Пули больше чем темп стрельбы
    if (fire) {
      if (
        this.lastAdded > SETTINGS.bulletFireRate &&
        this.player.state !== SETTINGS.PLAYER.state.hitFlashing
      ) {
        // обнуляем приращение
        this.lastAdded = 0;
        // добавляем в массив пуль новую Пулю
        this.listBullets.push(
          new Bullet(
            `bullet_${this.total_bullets}`,
            GameManager.assets[laser],
            new Point(
              this.player.position.x + this.player.size.width / 2,
              this.player.position.y
            )
          )
        );
        sound.playSound(soundFiles.shot);
        this.total_bullets += 1;
        SETTINGS.fire = false;
      }
    }
  }
}

export default BulletCollection;
