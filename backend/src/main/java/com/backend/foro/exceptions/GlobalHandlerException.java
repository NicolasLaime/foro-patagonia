package com.backend.foro.exceptions;

import com.backend.foro.dtos.ErrorResponseDTO;
import com.backend.foro.dtos.ErrorValidationDTO;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalHandlerException {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorValidationDTO> handlerMethodArgumentNotValidException(
            MethodArgumentNotValidException ex, HttpServletRequest request) {

        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage())
                .collect(Collectors.toList());

        return new ResponseEntity<>(ErrorValidationDTO.builder()
                .details(errors)
                .message("Validation failed for the request body.")
                .errorCode("P-400")
                .path(request.getRequestURI())
                .timestamp(LocalDateTime.now())
                .detail("MethodArgumentNotValidException")
                .build(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleEntityNotFoundException (EntityNotFoundException ex, HttpServletRequest request){
        return new ResponseEntity<>(ErrorResponseDTO.builder()
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .errorCode("P-404")
                .detail("Entity Not Found")
                .timestamp(LocalDateTime.now())
                .build(), HttpStatus.NOT_FOUND);
    }


}
