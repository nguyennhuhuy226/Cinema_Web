package com.baobeodev.identity_service.controller;

import com.baobeodev.identity_service.dto.request.ApiResponse;
import com.baobeodev.identity_service.dto.request.BranchRequest;

import com.baobeodev.identity_service.dto.response.BranchResponse;
import com.baobeodev.identity_service.dto.response.MovieResponse;
import com.baobeodev.identity_service.service.BrandService;
import com.baobeodev.identity_service.service.MovieService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/branch")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class BranchController {
@Autowired
    BrandService brandService;
@PostMapping
    public ApiResponse<BranchResponse> createBranch(@RequestBody BranchRequest request){
    return ApiResponse.<BranchResponse>
    builder().result(brandService.createBranch(request)).build();
}
    @GetMapping
    public ApiResponse<List<BranchResponse>> getAllBranches() {
        List<BranchResponse> branches=brandService.getAllBranches();
        return ApiResponse.<List<BranchResponse>>builder()
                .result(branches)
                .build();}
    @DeleteMapping("/{id_Brand}")
    String deleteMovie( @PathVariable("id_Brand") int id){
        brandService.deleteBranch(id);
        return "Brand has been deleted";
    }
}
