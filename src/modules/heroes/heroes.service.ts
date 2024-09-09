import { ConflictException, Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Hero } from './schemas/hero.schema';
import { Model } from 'mongoose';

@Injectable()
export class HeroesService {
  constructor(@InjectModel(Hero.name) private heroModel: Model<Hero>) {}

  async create(createHeroDto: CreateHeroDto) {
    const existsHero = await this.heroModel.findOne({
      name: createHeroDto.name,
    });

    if (existsHero) {
      throw new ConflictException(`Hero ${createHeroDto.name} existe`);
    }

    const createHero = new this.heroModel(createHeroDto);
    return createHero.save();
  }

  async findAll() {
    return this.heroModel.find();
  }

  async findOne(name: string) {
    const existsHero = await this.heroModel.findOne({
      name: name,
    });

    if (!existsHero) {
      throw new ConflictException(`Hero ${name} no existe`);
    }
    return this.heroModel.findOne({ name });
  }

  async update(name: string, updateHeroDto: UpdateHeroDto) {
    const existsHeroOri = await this.heroModel.findOne({ name });

    if (!existsHeroOri) {
      throw new ConflictException(`Hero ${name} no existe`);
    }

    await this.heroModel.updateOne({ name }, updateHeroDto); // <--- Filtro como objeto

    return this.heroModel.findOne({ name: updateHeroDto.name || name });
  }

  async remove(name: string) {
    const existsHero = await this.heroModel.findOne({
      name: name,
    });

    if (!existsHero) {
      throw new ConflictException(`Hero ${name} no existe`);
    }
    await this.heroModel.deleteOne({ name });
    return existsHero;
  }
}
