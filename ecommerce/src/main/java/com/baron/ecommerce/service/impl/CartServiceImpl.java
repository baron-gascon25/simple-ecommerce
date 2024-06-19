package com.baron.ecommerce.service.impl;

import com.baron.ecommerce.entity.Cart;
import com.baron.ecommerce.entity.Items;
import com.baron.ecommerce.entity.Product;
import com.baron.ecommerce.entity.User;
import com.baron.ecommerce.entity.dto.CartDto;
import com.baron.ecommerce.entity.dto.CartPendingDto;
import com.baron.ecommerce.entity.dto.CheckoutDto;
import com.baron.ecommerce.entity.enums.ItemStatus;
import com.baron.ecommerce.exception.UserNotFoundException;
import com.baron.ecommerce.repository.CartRepository;
import com.baron.ecommerce.repository.ItemsRepository;
import com.baron.ecommerce.repository.ProductRepository;
import com.baron.ecommerce.repository.UserRepository;
import com.baron.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ItemsRepository itemsRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public void add(int id, CartDto cartDto) {
        Product product = productRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Product not found"));
        User user = userRepository.findById(cartDto.getUserId()).orElseThrow(() -> new UserNotFoundException("User not found"));
        var itemToSave = Items.builder()
                .quantity(cartDto.getQuantity())
                .total(product.getPrice() * cartDto.getQuantity())
                .status(ItemStatus.PENDING)
                .product(product)
                .cart(user.getCart())
                .build();
        itemsRepository.save(itemToSave);
        getTotal(user.getCart());
    }

    @Override
    public void update(long id, CartDto cartDto) {
        User user = userRepository.findById(cartDto.getUserId()).orElseThrow(() -> new UserNotFoundException("User not found"));
        Items items = itemsRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Item not found"));
        if(items.getStatus().equals(ItemStatus.valueOf("PAID"))) {
            throw new UserNotFoundException("Cannot update already paid items");
        }
        Product product = productRepository.findById(items.getProduct().getId()).orElseThrow(() -> new UserNotFoundException("Product not found"));
        if(cartDto.getQuantity() < 1) {
            itemsRepository.delete(items);
        } else {
            items.setQuantity(cartDto.getQuantity());
            items.setTotal(product.getPrice() * cartDto.getQuantity());
            items.setProduct(product);
            itemsRepository.save(items);
        }
        getTotal(user.getCart());
    }

    @Override
    public void checkout(int userId, CheckoutDto checkoutDto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));
        if(!checkoutDto.getIds().isEmpty()){
            for(long id : checkoutDto.getIds()) {
                Items item = itemsRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Item not found"));
                Product product = productRepository.findById(item.getProduct().getId()).orElseThrow(() -> new UserNotFoundException("Product not found"));
                if(item.getCart().getId() == user.getCart().getId()) {
                    item.setStatus(ItemStatus.PAID);
                    product.setAmountSold(product.getAmountSold() + 1);
                    itemsRepository.save(item);
                    productRepository.save(product);
                }
            }
            getTotal(user.getCart());
        }
    }

    @Override
    public CartPendingDto get(int id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
        Cart cart = cartRepository.findById(user.getCart().getId()).orElseThrow(() -> new UserNotFoundException("Cart not found"));
        CartPendingDto cartPendingDto = new CartPendingDto();
        cartPendingDto.setItems(getTotal(cart));
        cartPendingDto.setTotal(cart.getTotal());
        return cartPendingDto;
    }

    public List<Items> getTotal(Cart cart) {
        List<Items> pendingItems = itemsRepository.findItemsByCartIdAndStatus(cart.getId(), ItemStatus.valueOf("PENDING"));
        if(!pendingItems.isEmpty()) {
            int total = 0;
            for(Items item : pendingItems) {
                total += item.getTotal();
            }
            cart.setTotal(total);
            cartRepository.save(cart);
        } else {
            cart.setTotal(0);
            cartRepository.save(cart);
        }
        return pendingItems;
    }
}
