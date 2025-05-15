package com.backend.foro.config;

import com.backend.foro.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //obtenemos encabezado
        String authHeader = request.getHeader("Authorization");

        //extraemos token
        if(authHeader !=null && authHeader.startsWith("Bearer ")){
            String token = authHeader.substring(7);

        //validamos token
        if (jwtUtil.validateToken(token)){
            //obtenemos de adentro del token el ususario y el rol del token
            String username = jwtUtil.getUserNameFromToken(token);
            String role = jwtUtil.getRoleFromToken(token);

            //creamos la lista de autoridades aca va el rol
            List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(role));

            // creamos el objeto de autenticacion basado en el nombre de usuario y el rol

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    username,
                    "",
                    authorities
            );

            // establecemos los detalles de la autenticacion en el request!
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            //establecemos el contexto de seguridad en el SecurityContextHolder
            SecurityContextHolder.getContext().setAuthentication(authentication);


        }
    }


        filterChain.doFilter(request,response);
}

}
