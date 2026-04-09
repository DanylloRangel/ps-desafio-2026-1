<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Testing\Fluent\Concerns\Has;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
    ];

    public function sportsArticles(){
        return $this->hasMany(SportsArticle::class, 'category_id', 'id');
    }

    protected static function booted()
    {
        self::deleting(function(Category $category){
            if($category->sportsArticles()->count() > 0){
                throw new \Exception('Não é possível deletar uma categoria que possui produtos vinculados');
            }
        });
    }
}

