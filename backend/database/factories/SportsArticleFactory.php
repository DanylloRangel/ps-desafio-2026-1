<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SportsArticle>
 */
class SportsArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(), 
            'brand' => fake()->company(),
            'price' => fake()->randomFloat(2, 1, 100),
            'year' => (int) fake()->year(),
            'image' => 'https://picsum.photos/300/200?random=' . fake()->numberBetween(1, 100),
            'amount' => fake()->numberBetween(1, 100),
            'category_id' => Category::factory(),
        ];
    }
}
