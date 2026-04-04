<?php

namespace App\Http\Controllers;

use App\Models\SportsArticle;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSportsArticleRequest;
use App\Http\Requests\UpdateSportsArticleRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Js;
use Nette\Utils\Json;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class SportsArticleController extends Controller
{
    protected $sportsArticle;

    public function __construct(SportsArticle $sportsArticle){
        $this->sportsArticle = $sportsArticle;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $sportsArticle = $this->sportsArticle->with('category')->get();
        return response()->json($sportsArticle, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSportsArticleRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('SportsArticles', 'public');
            $data['image'] = url('storage/'.$path); 
        }

        $product = $this->sportsArticle->create($data);
        $id = $product->id;
        $SportsArticle_category = $this->sportsArticle->with('category')->findOrFail($id);

        return response()->json($SportsArticle_category, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $sportsArticle = $this->sportsArticle->with('category')->findOrFail($id);
        return response()->json($sportsArticle, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSportsArticleRequest $request, $id): JsonResponse
    {
        $sportsArticle = $this->sportsArticle->with('category')->findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('image')) {
            try {
                $image_name = explode('sportsarticle/', $sportsArticle['image']);
                Storage::disk('public')->delete('SportsArticles/'.$image_name[1]);
            } catch (Throwable) {}
            finally {
                $path = $request->file('image')->store('SportsArticles', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }

        $data = $request->validated();

        $sportsArticle->update($data);
        return response()->json($sportsArticle, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $sportsArticle = $this->sportsArticle->findOrFail($id);
        $sportsArticle->delete();

        return response()->json(['message' => 'Artigo esportivo deletado com sucesso!']);

    }
}
