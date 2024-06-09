package com.baron.ecommerce.exception;

import com.baron.ecommerce.entity.dto.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ResponseDto> handleException(UserNotFoundException exc) {
        ResponseDto error = null;
        if(exc.getMessage().equals("User already exists")) {
            error = new ResponseDto(HttpStatus.BAD_REQUEST.value(), exc.getMessage());
        } else {
            error = new ResponseDto(HttpStatus.NOT_FOUND.value(), exc.getMessage());
        }
        return ResponseEntity
                .status(error.getStatusCode())
                .body(error);
    }

    @ExceptionHandler
    public ResponseEntity<ResponseDto> handleException(Exception exc) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ResponseDto(HttpStatus.BAD_REQUEST.value(), exc.getMessage()));
    }
}
