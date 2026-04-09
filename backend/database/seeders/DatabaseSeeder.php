<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\SportsArticle;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        $categories = Category::factory(10)->create();
        SportsArticle::factory(10)->recycle($categories)->create();

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        $user->assignPermission('admin');
    }
}
