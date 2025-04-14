$(document).ready(function() {
    // Initialize modal
    const productModal = new bootstrap.Modal('#productModal');
    let editingProductId = null;

    // Add product button
    $('#addProductBtn').click(function() {
        editingProductId = null;
        $('#modalTitle').text('Add Product');
        $('#productForm')[0].reset();
        productModal.show();
    });

    // Prevent form submission
    $('#productForm').submit(function(e) {
        e.preventDefault();
    });

    // Save product
    $('#saveProductBtn').click(function() {
        const productData = {
            Id: editingProductId || 0,
            Name: $('#productName').val().trim(),
            Stock: parseInt($('#productStock').val()) || 0,
            Category: $('#productCategory').val().trim()
        };

        if (!productData.Name) {
            alert('Product name is required');
            return;
        }

        const method = editingProductId ? 'PUT' : 'POST';
        const url = editingProductId ? `/api/products/${editingProductId}` : '/api/products';

        $.ajax({
            url: url,
            type: method,
            contentType: 'application/json',
            data: JSON.stringify(productData),
            success: function() {
                productModal.hide();
                loadProducts();
            },
            error: function(xhr) {
                alert('Error: ' + xhr.responseText);
            }
        });
    });

    // Load products
    function loadProducts() {
        $.ajax({
            url: '/api/products',
            type: 'GET',
            success: function(response) {
                console.log('API Response:', response); // Debug line
                renderProducts(response);
            },
            error: function(xhr) {
                console.error('Error:', xhr.responseText);
                alert('Failed to load products');
            }
        });
    }

    // Render products
    function renderProducts(products) {
        const tableBody = $('#productTableBody'); //tbody
        tableBody.empty();

        if (!products || products.length === 0) {
            tableBody.append('<tr><td colspan="5">No products found</td></tr>');
            return;
        }

        products.forEach(function(product) {
            const row = `
                <tr>
                    <td>${product.id || ''}</td>
                    <td>${product.name || ''}</td>
                    <td>${product.stock || 0}</td>
                    <td>${product.category || ''}</td>
                    <td>
                        <button class="btn btn-sm btn-primary edit-btn" data-id="${product.id}">Edit</button>
                        <button class="btn btn-sm btn-danger delete-btn" data-id="${product.id}">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.append(row);
        });

        $(document).on('click', '.edit-btn', function() {
            editProduct($(this).data('id'));
        });
        
        $(document).on('click', '.delete-btn', function() {
            deleteProduct($(this).data('id'));
        });
    }

    // Edit product
    function editProduct(id) {
        $.ajax({
            url: `/api/products/${id}`,
            type: 'GET',
            success: function(product) {
                editingProductId = product.id;
                $('#modalTitle').text('Edit Product');
                $('#productName').val(product.name || '');
                $('#productStock').val(product.stock || '');
                $('#productCategory').val(product.category || '');
                productModal.show();
            },
            error: function(xhr) {
                alert('Error loading product: ' + xhr.responseText);
            }
        });
    }

    // Delete product
    function deleteProduct(id) {
        if (!confirm('Are you sure you want to delete this product?')) return;
        
        $.ajax({
            url: `/api/products/${id}`,
            type: 'DELETE',
            success: loadProducts,
            error: function(xhr) {
                alert('Error deleting product: ' + xhr.responseText);
            }
        });
    }

    // Initial load
    loadProducts();
});