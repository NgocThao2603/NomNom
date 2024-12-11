USE nomnom;

DELIMITER $$

-- Xóa thủ tục cũ nếu có
DROP PROCEDURE IF EXISTS FilterDishes$$

-- Tạo thủ tục FilterDishes
CREATE PROCEDURE FilterDishes(
    IN p_category_ids VARCHAR(255),  -- Chuỗi chứa các category_id, phân cách bằng dấu phẩy
    IN p_minPrice DECIMAL(10,2),
    IN p_maxPrice DECIMAL(10,2),
    IN p_minCalo INT,
    IN p_maxCalo INT
)
BEGIN
    SELECT 
        d.id, d.dish_name, d.price, d.average_rating, d.calories, d.img_url, d.category_id, 
        r.distance, r.res_address
    FROM Dishes d
    JOIN Restaurants r ON d.restaurant_id = r.id
    WHERE 
        (p_category_ids IS NULL OR p_category_ids = '' OR FIND_IN_SET(d.category_id, p_category_ids) > 0)
        AND (p_minPrice IS NULL OR p_minPrice = '' OR d.price >= p_minPrice)
        AND (p_maxPrice IS NULL OR p_maxPrice = '' OR d.price <= p_maxPrice)
        AND (p_minCalo IS NULL OR p_minCalo = '' OR d.calories >= p_minCalo)
        AND (p_maxCalo IS NULL OR p_maxCalo = '' OR d.calories <= p_maxCalo)
    ORDER BY 
        d.average_rating DESC;
END $$

DELIMITER ;

DELIMITER $$

-- Xóa thủ tục cũ nếu có
DROP PROCEDURE IF EXISTS GetCartItemsByUser$$

-- Tạo thủ tục GetCartItemsByUser
CREATE PROCEDURE GetCartItemsByUser(IN userId INT)
BEGIN
  SELECT 
    dishes.id, 
    dishes.dish_name, 
    dishes.desrip, 
    dishes.price, 
    dishes.calories,
    dishes.img_url, 
    cart_items.quantity
  FROM cart_items 
  JOIN dishes ON dishes.id = cart_items.dish_id
  WHERE cart_items.user_id = userId;
END $$

DELIMITER ;

DELIMITER $$

-- Xóa thủ tục cũ nếu có
DROP PROCEDURE IF EXISTS AddOrUpdateCartItem$$

-- Tạo thủ tục mới
CREATE PROCEDURE `AddOrUpdateCartItem`(
    IN p_user_id INT, 
    IN p_dish_id INT, 
    IN p_quantity INT
)
BEGIN
    -- Kiểm tra nếu món ăn đã có trong giỏ hàng của người dùng
    IF EXISTS (SELECT 1 FROM `cart_items` WHERE `user_id` = p_user_id AND `dish_id` = p_dish_id) THEN
        -- Nếu đã có, cập nhật số lượng món ăn
        UPDATE `cart_items`
        SET `quantity` = `quantity` + p_quantity
        WHERE `user_id` = p_user_id AND `dish_id` = p_dish_id;
    ELSE
        -- Nếu chưa có, chèn món ăn vào giỏ hàng
        INSERT INTO `cart_items` (`user_id`, `dish_id`, `quantity`)
        VALUES (p_user_id, p_dish_id, p_quantity);
    END IF;

    -- Trả về số lần món ăn xuất hiện trong giỏ hàng
    SELECT COUNT(DISTINCT dish_id) AS total_dishes
    FROM `cart_items`
    WHERE `user_id` = p_user_id;
END $$

DELIMITER ;






