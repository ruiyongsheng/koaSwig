axios
  // 页面渲染
  .get("/")
  .then(function (res) {
    var html;
    $.each(res.data, function (index, msg) {
      // console.log(JSON.stringify(msg))
      html +=
        "<tr>" +
        "<td>" + msg.code + "</td>" +
        "<td>" + msg.name + "</td>" +
        "<td>" + msg.population + "</td>" +
        '<td>' +
        // "<a href='/book?id=" + msg.code + "'>编辑</a>" +
        "<span data-id='" + msg.code + "' class='deltBtn'>删除</span>" +
        '</td>' +
        "</tr>";
    });
    $("#table").append(html);
  })
  .catch(function (error) {
    console.log(error);
  });
// 删除
$(document).on('click', '.deltBtn', function () {
    var id = $(this).attr('data-id');
    var trNode = $(this).closest('tr');
    axios.get('/delete/' + id)
      .then(function (res) {
        console.log(res)
        trNode.remove();
        // layer.msg('删除成功');
      })
  })
  .get("/update")
  .then(function (res) {
    var data = res.data;
    $('form [name="number"]').val(data.title);
    $('form [name="name"]').val(data.describe);
    $('form [name="main"]').val(data.content);
    $('form [name="main"]').val(data.content);
  })

$(document).on('click', '#update', function () {
  var formData = $(this).closest('form').serialize();
  $.post(API_URL.book, formData, function (res) {
    var data = res.data;
    layer.alert(res.message, function () {
      window.location.href = window.location.origin + '/books';
    });
  });
});