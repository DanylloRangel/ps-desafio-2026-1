<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class SportsArticle extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'brand',
        'price',
        'year',
        'image',
        'category_id',
        'amount'
    ];

    public function category(){
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    protected static function booted(){
        self::deleted(function ($sportsArticle) {
            if ($sportsArticle->image){
                try {
                    $image_name = explode('sportsarticle/', $sportsArticle['image']);
                    Storage::disk('public')->delete('SportsArticles/'.$image_name[1]);
                } catch (Throwable){}
            }
        });
    }
}
