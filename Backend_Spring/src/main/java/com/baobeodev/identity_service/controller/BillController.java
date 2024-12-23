package com.baobeodev.identity_service.controller;

import com.baobeodev.identity_service.dto.request.ApiResponse;
import com.baobeodev.identity_service.dto.response.BillResponse;
import com.baobeodev.identity_service.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bills")
@RequiredArgsConstructor
public class BillController {
    @Autowired
    BillService billService;
    @PostMapping()
    public ApiResponse<BillResponse> createBillForCurrentUser() {
        BillResponse billResponse = billService.createBillForCurrentUser();
        return ApiResponse.<BillResponse>builder().result(billResponse).build();
    }
    @GetMapping("/my-bills")
    public ApiResponse<List<BillResponse>> getAllBillsForCurrentUser() {
        List<BillResponse> billResponses = billService.getAllBillsForCurrentUser();
        return ApiResponse.<List<BillResponse>>builder().result(billResponses).build();
    }
    @GetMapping("/user/{idUser}")
    public ApiResponse<List<BillResponse>> getBillsByIdUser(@PathVariable String idUser) {
        List<BillResponse> billResponses = billService.getAllBillsByUser(idUser);
        return ApiResponse.<List<BillResponse>>builder().result(billResponses).build();
    }
    @GetMapping
    public ApiResponse<List<BillResponse>> getBills() {
        List<BillResponse> billResponses = billService.getBills();
        return ApiResponse.<List<BillResponse>>builder().result(billResponses).build();
    }
}
