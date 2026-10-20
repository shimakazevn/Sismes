/**
 * Populate scenario_extract.json with complete Vietnamese translations
 */
const fs = require('fs');
const path = require('path');

const extractFile = path.join(__dirname, 'scenario_extract.json');
const data = JSON.parse(fs.readFileSync(extractFile, 'utf8'));

// 1. ed4.ks
const ed4_trans = [
  "Dù có thế nào đi chăng nữa, mối quan hệ \"anh em\" này...[r]",
  "mình vẫn muốn tiếp tục gìn giữ nó, đúng không nhỉ……[p]",
  "Thôi nào……[r]",
  "Hôm nay lại tiếp tục làm việc thôi[p]"
];
if (data['ed4.ks']) {
  data['ed4.ks'].forEach((entry, i) => {
    if (ed4_trans[i]) entry.translated = ed4_trans[i];
  });
}

// 2. ed2.ks
const ed2_trans = [
  "#Em gái",
  "Ưm…… ưn…… a a……[r]",
  "Ưn…… phù…… ư……!",
  "A a…… k-không…… đừng mà……[r]",
  "Anh hai…… tại sao chứ…… hức"
];
if (data['ed2.ks']) {
  data['ed2.ks'].forEach((entry, i) => {
    if (ed2_trans[i]) entry.translated = ed2_trans[i];
  });
}

// 3. osawari_event.ks
const osawari_event_trans = [
  "\tA…… tại sao chứ……?[r]",
  "\t……A…… ưn…… cơ thể em…… lạ quá à……",
  "\t……Tại sao chứ……? Anh hai……[r]",
  "\tChuyện thế này…… em sợ lắm……",
  "\t……Em xin anh…… dừng lại đi mà……",
  "\tChúng ta là anh em mà…… không được đâu……",
  "\t……Tại sao chứ…… tại sao……?[r]",
  "\tĐừng mà…… anh hai…… đừng làm thế mà……",
  "\t……Không muốn đâu…… em sợ lắm mà……[r]",
  "\tChuyện thế này…… dừng lại đi mà……",
  "\t……Là nói dối đúng không anh?[r]",
  "\tAnh hai…… tại sao lại làm vậy……?"
];
if (data['osawari_event.ks']) {
  data['osawari_event.ks'].forEach((entry, i) => {
    if (osawari_event_trans[i]) entry.translated = osawari_event_trans[i];
  });
}

// 4. ed1.ks
const ed1_trans = [
  "――Cốc cốc[p]",
  "#Em gái",
  "Anh hai ơi, em vào được không?",
  "Em xin phép vào nha……",
  "A, vâng[r]",
  "Em có điều này muốn nói với anh hai……[p]",
  "Thật ra thì trò chơi online đó,[r]",
  "Em đã bắt đầu chơi từ trước khi hỏi ý anh hai rồi.",
  "Vì đang trong thời gian chơi thử không tốn tiền,[r]",
  "Nên em đã không nói trước với anh……[p]",
  "Em biết rõ là mình không nên lông bông chơi game như thế,[r]",
  "Nhưng bước ra ngoài xã hội đối với em vẫn thật đáng sợ……[p]",
  "Em từng nghĩ nếu ở trong game, có lẽ mình có thể trò chuyện được với ai đó……[r]",
  "Rồi từ đó sẽ quen dần với mọi người, và không còn sợ ra ngoài nữa[p]",
  "Thế nhưng, mọi chuyện đâu có dễ dàng như vậy nhỉ[r]",
  "Rốt cuộc em lại càng thêm bối rối và sợ hãi hơn[p]",
  "Nhưng mà, em cũng muốn được giống như anh hai,[r]",
  "Có thể làm việc tại nhà, nên em sẽ cố gắng chăm chỉ học hành……[p]",
  "Nếu anh hai có thể luôn ở bên cạnh nâng đỡ em thì em sẽ vui lắm……",
  "Dù em là đứa em gái còn nhiều vụng về,[r]",
  "Nhưng từ nay về sau mong anh hãy tiếp tục chiếu cố cho em nhé……![p]",
  "Đó là điều em muốn nói với anh nhất đấy[r]",
  "A haha…… Tự nhiên nói trang trọng thế này ngượng ghê[p]",
  "Vậy thì, em xin phép về lại phòng mình nhé?[r]",
  "Trong công việc nếu có gì em giúp được thì anh cứ bảo em bất cứ lúc nào nha?[p]",
  "――Cho đến khi mối quan hệ [ruby text=\"anh\" y=8]này[ruby text=\"em\" y=8] méo mó này sụp đổ……[r]",
  "Mãi mãi………… mãi mãi…………[l]"
];
if (data['ed1.ks']) {
  data['ed1.ks'].forEach((entry, i) => {
    if (ed1_trans[i]) entry.translated = ed1_trans[i];
  });
}

// 5. main_event.ks
const main_event_trans = [
  "\t#Em gái",
  "\t#Em gái",
  "\t\t#Em gái",
  "\t\tƯm…… Xong rồi! Mát-xa xong rồi nè[r]",
  "\t\tHôm nay anh cũng vất vả rồi ạ[p]",
  "\t\t#Em gái",
  "Chúc anh hai ngủ ngon nhé[p]",
  "\tdocument.querySelector(\".commu_1\")?.insertAdjacentHTML(\"beforeend\", \"<div class='selectHP'>Thể lực: 20</div>\");",
  "[jump target=\"not_osawari\" cond=\"SISMES.savedata.status.shinrai < 0 && !SISMES.savedata.item['困った時のピッキング術']\"]",
  "Sự kiện ngày đầu",
  "A, đúng rồi, anh hai ơi[r]",
  "Lát nữa em có chuyện này muốn hỏi ý anh một chút……",
  "Lúc nào anh tiện cũng được hết á![r]",
  "Lát nữa cho em nói chuyện một lát nhé?[p]",
  "（…………Nhắc mới nhớ, đêm hôm qua……）[p]",
  "（Anh hai đã làm gì mình thế nhỉ……？）[p]",
  "#Em gái",
  "……Chào buổi sáng anh[p]",
  "Ưm…… Chuyện đó em sẽ quên đi[r]",
  "Nên những chuyện như hôm qua, em mong anh đừng lặp lại nữa nhé[p]",
  "……Em gái không chịu ra khỏi phòng[r]",
  "Có vẻ con bé đã khóa trái cửa và nhốt mình bên trong[p]",
  "（……Sao người mình cứ bồn chồn ngứa ngáy thế nhỉ……？）[p]",
  "（Sao vậy ta……？ Mình bị sốt chăng……？）[p]",
  "（Thôi chết……！ Quần lót bị ướt mất rồi……）[p]",
  "（Không phải là…… mình tè dầm đấy chứ？）[p]",
  "（……Chắc là tưởng tượng thôi. Đầu óc cứ lâng lâng……）[p]",
  "（……Mồ hôi trộm làm người dính dấp quá…… Đi tắm vòi sen thôi……）[p]",
  "（……Hả！？[r]",
  "Sao quần lót lại ướt sũng thế này……？？）[p]",
  "（Không thể nào…… Phải đi giặt ngay mới được……）[p]",
  "（……Đệm giường bị ướt nhiều quá……）[p]",
  "（Làm sao bây giờ…… Mong là không bị anh hai thấy……）[p]",
  "（……Đau quá！？）[p]",
  "（……Tận sâu trong bụng nhức buốt thế này……？）[p]",
  "（……Ưm…… Sắp đến ngày \"đèn đỏ\" rồi chăng？）[p]",
  "（……Ủa？……Người mình có mùi gì lạ thế này？）[p]",
  "（……Hôm qua mình tắm rửa kỹ càng rồi mà nhỉ……？）[p]",
  "（……Ưm, cảm giác như có thứ gì nhờn nhợn vướng ở cổ họng……）[p]",
  "（……Bị cảm rồi sao ta. Đi súc miệng thôi……）[p]",
  "（……！？ Hình như có thứ gì đó đang rỉ ra từ mông mình……？）[p]",
  "（……Không phải là…… mắc bệnh gì đấy chứ？）[p]",
  "（……Làm sao bây giờ……[r]",
  "Cảm giác như có thứ gì đó vừa chảy ra từ hạ bộ）[p]",
  "（……Khí hư sao……？ Nhưng mà nhiều thế này thì lạ thật……）[p]",
  "（……Có một cảm giác thật kỳ lạ……？）[p]",
  "（Cảm giác ấm áp lạ thường lan tỏa từ sâu trong bụng……）[p]",
  "（……Hôm nay chắc sẽ có chuyện gì tốt lành xảy ra chăng？）[p]"
];
if (data['main_event.ks']) {
  data['main_event.ks'].forEach((entry, i) => {
    if (main_event_trans[i]) entry.translated = main_event_trans[i];
  });
}

// 6. main_scenario.ks
const main_scenario_trans = [
  "#Em gái",
  "Dạ thì…… Trò này thu phí hàng tháng, lại còn là game online nữa nên[r]",
  "Em nghĩ mình nên hỏi ý kiến anh hai trước xem sao……[p]",
  "Trò chơi mà em gái đang nhắc tới chính là tựa MMO[r]",
  "ngày xưa tôi từng cày cuốc say mê một thời[p]",
  "Dù là game đóng phí tháng, nhưng nó không có yếu tố nạp gacha hút máu,[r]",
  "và tiền nạp cũng nằm trong giới hạn tiền tiêu vặt nên tôi bảo em cứ thoải mái[p]",
  "#Em gái",
  "Tuyệt quá![r]",
  "Cảm ơn anh hai nhiều nhé!",
  "Để có thể tái hòa nhập với xã hội bất cứ lúc nào,[r]",
  "em gái đã hứa sẽ giữ nếp sinh hoạt điều độ và học tập chăm chỉ[p]",
  "#Em gái",
  "Em vẫn sẽ học bài chăm chỉ như mọi khi mà,[r]",
  "với lại cứ đúng 10 giờ tối là em sẽ đi ngủ ngay[p]",
  "#Em gái",
  "Dạ, em vẫn học hành nghiêm túc lắm nha,[r]",
  "em luôn giữ đúng lời hứa mà[p]",
  "Nhưng mà……[r]",
  "Thật ra có nhiều chỗ em không hiểu lắm……[p]",
  "Nếu không phiền công việc của anh hai thì,[r]",
  "thỉnh thoảng anh kèm em học bài một chút được không ạ……",
  "Chứ ai lại đi nhờ người quen trong game[r]",
  "kèm học cho mình bao giờ đâu anh nhỉ",
  "Nhưng mà em vẫn thấy hơi sợ người lạ……[r]",
  "Nên ngoài người đó ra thì em chẳng nói chuyện với ai khác cả[p]",
  "Th-Thôi, chuyện đó để sau, lo học bài trước đã……![r]",
  "Anh nhớ dạy em nhẹ nhàng thôi đấy nhé, anh hai![p]",
  "※ Từ giờ trở đi, khi độ Tin cậy của em gái đạt từ 20 trở lên,[r]",
  "bạn có thể chọn mục 「Kèm học」 trong phần Giao tiếp[p]",
  "#Em gái",
  "Anh hai dạo này không còn chơi game online nữa hả anh?",
  "Vậy hả anh[r]",
  "Anh hai cũng thuộc tuýp người một khi đã mê là dứt không ra mà nhỉ[p]",
  "Nhưng mà anh suốt ngày chỉ cắm đầu vào công việc,[r]",
  "rồi lại còn phải kèm em học bài nữa……[p]",
  "Thỉnh thoảng đổi gió xả hơi một chút,[r]",
  "hai anh em mình cùng chơi game gì đó offline đi anh[p]",
  "A, nhưng mà anh hai chơi giỏi lắm, nên[r]",
  "mình chơi game phối hợp đồng đội đi nha anh",
  "Vâng ạ![r]",
  "Lâu lắm rồi mới lại được chơi game cùng anh hai, em háo hức quá![p]",
  "※ Từ giờ trở đi, khi độ Tin cậy của em gái đạt từ 40 trở lên,[r]",
  "bạn có thể chọn mục 「Chơi game」 trong phần Giao tiếp[p]",
  "#Em gái",
  "Dạo này anh hai ngủ có ngon giấc không đấy ạ?",
  "Thật không đó? Dạo này thấy anh chăm chỉ làm việc hơn trước,[r]",
  "buổi sáng trông anh buồn ngủ lắm nên em thấy lo lo á",
  "Hở? Em thì không sao đâu mà[r]",
  "Anh thấy đấy, em luôn lên giường đi ngủ đúng 10 giờ còn gì?[p]",
  "Người hay chơi game chung với em cũng thế á,[r]",
  "người ta bảo phải dậy sớm nên tầm 10 giờ là thoát game rồi[p]",
  "Chắc là người ta cũng bận rộn với công việc[r]",
  "giống như anh hai chăng?[p]",
  "Người đó ít khi kể về bản thân lắm,[r]",
  "nên em cũng chẳng biết rõ nữa[p]",
  "……Nhắc mới thấy, hình như ngược lại[r]",
  "em lại kể lể quá nhiều chuyện của mình rồi thì phải……",
  "D-Dạ vâng[r]",
  "Mấy chuyện đó chắc…… không…… sao đâu nhỉ?[p]",
  "Đấy anh xem, nếu mà anh hai ngã bệnh ra đó[r]",
  "thì một mình em chẳng biết xoay xở thế nào đâu……[p]",
  "A đúng rồi! Từ giờ trở đi, trước khi đi ngủ[r]",
  "em sẽ mát-xa lưng cho anh hai nhé!",
  "Vâng ạ![r]",
  "Để em làm chừng đó việc để đền đáp công ơn anh chăm sóc em bấy lâu chứ[p]",
  "※ Từ giờ trở đi, khi độ Tin cậy của em gái đạt từ 60 trở lên,[r]",
  "mỗi khi bước sang 22:00, thể lực của bạn sẽ được hồi phục một phần[p]",
  "#Em gái",
  "Anh hai ơiiii～!",
  "Hì hì![r]",
  "Em gọi thử xem anh có ở đó không thôi!",
  "Tự nhiên em thấy ngày nào cũng vui hết trơn á……[r]",
  "Cảm giác thời gian trôi qua nhanh thật luôn……![p]",
  "Vâng! Tất cả là nhờ anh hai đã cho phép em chơi game đó,[r]",
  "cảm ơn anh hai nhiều nha[p]",
  "Trong công việc của anh hai,[r]",
  "có việc gì em phụ giúp được thì anh cứ nói với em nhé[p]",
  "※ Từ giờ trở đi, khi độ Tin cậy của em gái đạt từ 80 trở lên,[r]",
  "khi bạn làm việc, lượng thể lực tiêu hao sẽ được giảm bớt[p]",
  "#Em gái",
  "Dạ…… cái người bạn chơi thân với em ấy,[r]",
  "tự nhiên lại xóa tài khoản mất tiêu rồi……[p]",
  "Hôm qua người đó còn chưa hề nói gì hết mà đùng một cái biến mất,[r]",
  "làm em sốc quá chừng luôn……[p]",
  "Có khi nào là do em bám người quá không ta……?[r]",
  "Liệu em có làm phiền người ta không nhỉ……",
  "Rồi thì, trong hòm thư của game,[r]",
  "người đó có để lại một tin nhắn duy nhất[p]",
  "『Trong thế giới này, em là điều duy nhất mang lại sắc màu rực rỡ.[r]",
  "_　Bằng sắc màu của em, bằng giọng nói của em, cho tới ngày hồi kết đến……』[p]",
  "Cái gì thế này? Câu đố mật mã sao……??[r]",
  "Trời ơi, chẳng hiểu nổi người ta muốn nói gì hết trơn á……[p]",
  "Đúng là con trai khó hiểu thật đấy……",
  "Hả!? Hả hảaa!!?[r]",
  "Th-Thích á……! Đâu có chuyện đó đâu chứ……![p]",
  "Người ta chơi game siêu đỉnh luôn,[r]",
  "nên em thấy ngầu thật đấy nhưng mà……[p]",
  "Con trai hay…… con gái sao……?[r]",
  "Mấy chuyện tình cảm đó em hoàn toàn chẳng hiểu gì cả……[p]",
  "Nè anh? Anh hai ơi,[r]",
  "trong mắt người đàn ông khác thì trông em thế nào nhỉ……?",
  "Đúng rồi anh nhỉ, trong mắt anh hai thì em[r]",
  "cũng chỉ là đứa em gái mà thôi…… Xin lỗi anh nhé, tự nhiên em lại nói mấy câu kỳ quặc[p]",
  "Haizz![r]",
  "Tự nhiên em chẳng còn chút hứng thú nào để chơi cái game đó nữa rồi……[p]",
  "Chắc là đợi đến khi tâm trạng ổn định lại,[r]",
  "em sẽ tạm nghỉ chơi một thời gian luôn![p]",
  "Từ giờ trở đi, khoảng thời gian rảnh rỗi đó[r]",
  "em phụ giúp công việc cho anh hai nhiều hơn được không anh?[p]",
  "Không hiểu sao vượt qua cảm giác buồn bã rồi,[r]",
  "giờ em thấy bực mình khó chịu ghê luôn á![p]",
  "Cứ ở một mình là em lại suy nghĩ vẩn vơ mất,[r]",
  "nên em muốn phụ anh làm việc để giải tỏa tâm trạng!",
  "Quả nhiên những lúc được nói chuyện với anh hai[r]",
  "là thoải mái và yên bình nhất anh nhỉ[p]",
  "※ Từ giờ trở đi, khi độ Tin cậy của em gái đạt mức 100,[r]",
  "khi bạn làm việc, số tiền kiếm được sẽ tăng lên đáng kể.[p]"
];
if (data['main_scenario.ks']) {
  data['main_scenario.ks'].forEach((entry, i) => {
    if (main_scenario_trans[i]) entry.translated = main_scenario_trans[i];
  });
}

// 7. zenjitsu.ks
const zenjitsu_trans = [
  "_　Nói một cách hoa mỹ thì môi trường này quả là lý tưởng để toàn tâm toàn ý gõ phím bên chiếc máy tính.[l][r]",
  "_　――Phù, tôi thở dài một hơi nhẹ nhõm, buông tay khỏi bàn phím và với lấy tách cà phê.[l]Công việc cuối cùng cũng tạm thời xong một chặng.[p]",
  "_　Trong căn phòng tĩnh mịch, từ đằng xa bỗng vang lên tiếng cửa mở nhè nhẹ.[l][r]",
  "_　Nhờ âm thanh ấy kéo tôi ra khỏi dòng suy nghĩ miên man, tôi đưa mắt nhìn xuống góc màn hình để xem giờ.[p]",
  "_　……Đã đến giờ ăn trưa rồi.[l]Chắc là em gái tôi thấy đói nên mới chịu bước ra ngoài.[l][r]",
  "_　Tôi cũng định kiếm chút gì đó bỏ bụng nên cất bước đi ra khỏi phòng.[p]",
  "_　Từ chiếc máy tính xách tay đặt ngay ngắn trên bàn trà thấp ở phòng khách, một giai điệu quen thuộc đang vang lên.[l][r]",
  "_　……Đó là bản nhạc nền của tựa game online mà ngày trước tôi từng một thời say mê.[p]",
  "_　Một tựa MMO được vận hành bởi một nhà phát hành danh tiếng. Kể từ khi không còn thời gian rảnh, tôi đã không đăng nhập vào đó suốt bao năm nay.[l][r]",
  "_　Nhắc mới nhớ, dạo gần đây hình như tôi có thoáng thấy quảng cáo trên web bảo rằng game vừa có một bản cập nhật lớn.[p]",
  "_　Nhưng điều đáng nói hơn cả là tại sao em gái tôi lại chơi game online?[l][r]",
  "_　Đứa em gái kể từ khi thu mình trong phòng kín đã luôn tránh tiếp xúc với người ngoài hết mức có thể cơ mà?[p]",
  "_　……Màn hình lúc này hiển thị chính xác thế giới game mà tôi từng biết, và ở ngay trung tâm là một nhân vật có gắn huy hiệu tân thủ đang đứng yên đó.[p]",
  "_　Tôi từng thoáng nghĩ hay con bé chỉ đang xem livestream của ai đó thôi, nhưng khi tôi thử khẽ chạm vào điều khiển thì nhân vật lập tức phản hồi.[p]",
  "「A, anh hai cũng ăn mì ly luôn không? Để em đun nước sôi cho nhaー」[l][r][r]",
  "_　Em gái tôi thò đầu ra từ gian bếp. Tôi chỉ đáp lại ngắn gọn một tiếng 「Ờ」.[p]",
  "_　――Sau đó, hai anh em cùng ngồi ăn mì ly, nhưng con bé tuyệt nhiên không hề đả động gì tới chuyện game gủng.[p]",
  "_　Buổi chiều hôm ấy, tôi chẳng thể nào tập trung nổi vào công việc.[l][r]",
  "_　Việc không nắm bắt được sự thay đổi trong tâm lý của em gái cứ như chiếc gai mắc trong lòng tôi.[p]",
  "_　Tôi đã nghĩ đến việc chủ động gặng hỏi con bé, nhưng rồi lại ngập ngừng vì sợ mình quá bảo bọc, quá can thiệp vào đời tư của nó.[p]",
  "_　……Dẫu vậy, một khi đã bận tâm thì lòng dạ cứ bồn chồn không yên.[p]",
  "_　Cứ thế loay hoay suốt gần hai tiếng đồng hồ, nhận thấy cứ đà này thì chẳng thể làm việc được, tôi bèn bắt đầu tải tựa game đó về.[p]",
  "_　Bản cài đặt của một tựa game trải qua nhiều năm cập nhật đã phình to đáng kể và tốn rất nhiều thời gian để tải.[l]Cộng thêm đường truyền mạng ở nhà cũng chẳng nhanh nhẹn gì, khiến khoảng thời gian chờ đợi trở nên dài đằng đẵng và trống rỗng.[p]",
  "_　Khi quá trình tải và cài đặt hoàn tất, bước tới được màn hình đăng nhập thì trời cũng đã ngả về chiều.[p]",
  "_　ID và mật khẩu từ hồi còn chơi game tôi vốn quen dùng chung một kiểu, nên việc đăng nhập có lẽ không thành vấn đề.[l]Thế nhưng……[p]",
  "_　――『Tài khoản này hiện đang ở trạng thái \"Hết hạn hợp đồng dịch vụ\", không thể tham gia trò chơi』[p]",
  "_　Phải rồi.[l]Ngay từ đầu trò chơi này vốn vận hành theo hình thức thu phí theo tháng.[l]Điều đó lại càng khiến tôi thêm thắc mắc vì sao con bé không hề nhắc tới chuyện này.[p]",
  "_　Hàng tháng tôi vẫn đưa cho em gái một khoản tiền tiêu vặt nhỏ. Dù tôi luôn bảo con bé cứ thoải mái tiêu xài theo ý thích, nhưng vì lo cho hoàn cảnh kinh tế gia đình nên con bé hầu như chẳng bao giờ dám đụng đến.[p]",
  "_　Dù vậy, mỗi khi cần dùng tiền vào việc gì, bao giờ con bé cũng hỏi ý kiến tôi trước.[l]Huống hồ đây lại là phí duy trì hàng tháng.[l]Với tính cách của em gái, chắc chắn con bé sẽ phải nói cho tôi biết về tựa game này chứ.[p]",
  "_　Trước mắt, tôi thanh toán gói cước ngắn nhất là một tháng, rồi thực hiện đăng nhập lại một lần nữa.[p]",
  "_　Lần này thuận lợi tiến vào màn hình chọn nhân vật, gặp lại hình bóng nhân vật ảo của mình sau nhiều năm xa cách.[l][r]",
  "_　Giai điệu BGM phát ra từ tai nghe khơi gợi lại biết bao kỷ niệm xưa cũ, và rồi tôi bắt đầu trò chơi.[p]",
  "_　Màn hình tải dữ liệu hiện lên, ngay khi chuyển cảnh sang bản đồ thế giới thì nhạc nền chiến đấu lập tức vang lên dồn dập.[p]",
  "_　Có vẻ như lần đăng xuất cuối cùng ngày xưa, tôi đã để nhân vật đứng ngay giữa một bãi quái vật.[l]Tuy nhiên, cấp độ quái ở khu vực này không cao cho lắm.[p]",
  "_　Vốn là người từng cày cuốc kha khá, tôi bình tĩnh xoay góc nhìn camera để dọn dẹp lũ quái gần đó, thì bất ngờ bắt gặp nhân vật có gắn huy hiệu tân thủ hồi trưa đang hớt hải bỏ chạy trước một đàn quái bu đông nghẹt.[p]",
  "_　……Trước mắt, tôi xông vào tiêu diệt từng con quái đang đuổi theo con bé.[l][r]",
  "_　Lâu ngày không chơi nên thao tác có phần đôi chút gượng gạo, nhưng tôi đã kịp quét sạch lũ quái trước khi thanh máu của em gái tụt về số 0.[p]",
  "_　Em gái điều khiển nhân vật chạy đến đứng trước mặt tôi.[l]……Thế nhưng, con bé chẳng nói chẳng rằng câu nào.[l]Chỉ lăng xăng chạy quanh nhân vật của tôi như muốn nói điều gì đó.[l][r]",
  "_　Không lẽ con bé còn chẳng biết cách dùng khung chat sao? Nghĩ vậy, nhìn hành động của con bé trông có vẻ như đang trêu ngươi, tôi liền hướng dẫn cho con bé cách thao tác chat.[p]",
  "『Em cảm ơn anh rất nhiều ạ!』[l][r][r]",
  "_　Tôi nhận được lời cảm ơn từ con bé.[l]Có vẻ như con bé mới chỉ vừa chập chững bước vào game, trong lúc ngơ ngác chưa hiểu gì thì bị rơi vào tình cảnh hiểm nghèo đó.[p]",
  "_　Sau đó, tôi dẫn con bé về một thị trấn an toàn gần đó. Trong lúc con bé hỏi cần phải làm gì tiếp theo và tôi tận tình chỉ dẫn từng ly từng tí, thời gian cứ thế trôi đi.[p]",
  "_　Thấm thoát một tuần lễ đã trôi qua kể từ sự việc hôm ấy.[l][r]",
  "_　Suốt quãng thời gian đó, tranh thủ những lúc rảnh rỗi giữa giờ làm việc, tôi lại đăng nhập vào game chơi cùng em gái, và nhận ra được nhiều điều.[p]",
  "_　Hơn nữa, cách con bé ứng xử với người khác cũng tốt hơn tôi tưởng nhiều.[l]Thậm chí có thể nói là rất đỗi tự nhiên.[l][r]",
  "_　Một đứa em gái tưởng chừng như đã cô lập bản thân, tránh né giao tiếp với xã hội suốt bao năm trời, vậy mà lại có khả năng trò chuyện khéo léo đến bất ngờ.[p]",
  "_　Nhân tiện nói thêm, em gái tôi vẫn hoàn toàn không hay biết người đang điều khiển nhân vật trước mặt nó chính là anh trai mình.[l][r]",
  "_　Tôi nghĩ rằng nếu không có lăng kính \"anh trai\" ngăn cách, có lẽ con bé sẽ cởi mở giãi bày được nhiều điều hơn, nên tôi vẫn tiếp tục giấu kín thân phận.[p]",
  "_　……Nhưng chuỗi ngày này cũng sẽ kết thúc vào hôm nay.[p]",
  "_　Nghe đâu em gái tôi biết trò này có đợt chơi thử miễn phí nên mới bắt đầu chơi.[l]Và đợt trải nghiệm đó sẽ kết thúc vào đúng 24 giờ đêm nay.[l][r]",
  "_　Khi nghe được điều đó, tôi mới vỡ lẽ ra lý do vì sao con bé lại tự ý chơi game mà không hề hỏi ý kiến tôi trước.[p]",
  "_　Đồng hồ đã điểm gần 21 giờ.[l][r]",
  "_　Dù thời gian chơi thử kéo dài đến 24 giờ, nhưng để giữ đúng nếp sinh hoạt điều độ, giờ giới nghiêm của em gái tôi là 22 giờ.[p]",
  "『A, chuyện là…… Trước khi chia tay, em muốn được cảm ơn anh đàng hoàng ạ』[l][r][r]",
  "_　Im ắng một thoáng, những dòng chữ hiện lên trên khung chat khiến tôi không thể tin vào mắt mình.[l][r][r]",
  "『Vì em muốn trực tiếp nói với anh…… Ừm thì, em bật Voice Chat được không anh?』[p]",
  "_　Trong tựa game này, khi lập tổ đội với nhau thì các thành viên có thể trò chuyện trực tiếp qua voice chat.[l][r]",
  "_　Trong lúc hoàn toàn chưa hiểu dụng ý của con bé là gì, tôi vội vã viện cớ nói dối rằng mình không có mic, rồi nhắn nếu em không phiền thì cứ nói đi.[p]",
  "「A…… Alo…… Anh có nghe thấy em nói không ạ?」[l][r][r]",
  "_　Thanh âm mà đáng lẽ ra tôi đã nghe đến quen tai mỗi ngày, vừa là giọng nói của đứa em gái tôi quen thuộc, nhưng lại vừa là giọng của một đứa em gái hoàn toàn xa lạ đối với tôi.[p]",
  "「C-Có thể đây sẽ là lần cuối cùng hai đứa mình gặp nhau…… Nên em muốn được nói lời cảm ơn anh thật lòng……」[l][r][r]",
  "「Với lại, em xin lỗi nhé…… Nếu để anh hai phát hiện em đang nói chuyện voice chat thì ngượng chết mất…… Nên em phải nói nhỏ thế này thôi」[p]",
  "_　Có lẽ vì con bé kề sát miệng vào mic để thu được âm thanh nhỏ nhất, nên từng hơi thở hòa lẫn trong giọng nói truyền thẳng qua tai nghe khiến tâm can tôi rung chuyển dữ dội.[p]",
  "_　Một giọng nói hoàn toàn khác hẳn thường ngày của em gái……[l]Mỗi khi nghe thanh âm ấy, tôi lại cảm thấy có thứ gì đó bên trong mình đang rạo rực, nóng bừng và trỗi dậy mãnh liệt……[p]",
  "「Thật lòng thì em từng nghĩ chỉ chơi thử cho biết thôi rồi sẽ nghỉ ngay……」[l][r][r]",
  "_　Thực ra trong suốt một tuần qua, có một điều luôn khiến tôi bận lòng suy nghĩ.[p]",
  "_　Liệu có phải em gái đang dành tình cảm cho nhân vật của tôi…… cho người đang ở phía bên kia màn hình hay không.[l][r]",
  "_　Và tình cảm đó, không phải là tình bạn đơn thuần, mà là tình cảm dành cho một người khác giới.[p]",
  "_　Tôi từng nghĩ chuyện đó làm sao có thể xảy ra được, nhưng nếu là con bé vốn chẳng có chút đề kháng nào với chuyện yêu đương thì cũng không phải không có lý, thế nhưng khi nghe giọng nói của con bé lúc này, một linh cảm chắc chắn chợt lóe lên trong đầu tôi.[p]",
  "_　Từ giọng nói ngây thơ dường như không tự nhận thức được ấy, không nghi ngờ gì nữa, đang toát ra sức quyến rũ chết người của một người đàn bà.[l][r]",
  "_　Giọng điệu nũng nịu ngọt ngào như mèo con chưa từng nghe thấy bao giờ, nét nữ tính lạ lẫm ấy của em gái khiến tôi dâng trào một cảm giác hưng phấn khôn tả.[p]",
  "_　Tôi chưa từng nhìn em gái mình bằng ánh mắt đó bao giờ.[l]Ít nhất thì bản thân tôi vẫn luôn tự nhủ như vậy……[p]",
  "_　Mỗi khi giọng nói ngọt ngào như liều thuốc mê ấy thốt ra từ bờ môi em gái, hơi thở của tôi lại càng dồn dập, và khi nhận ra thì hạ bộ đã cương cứng đến đau nhức.[p]",
  "_　Mỗi khi thứ thanh âm ngọt lịm đến đáng sợ kia…… từng hơi thở ấm áp rót thẳng vào màng nhĩ, sự kiêng dè trong tôi dần biến chất, và chẳng biết từ lúc nào bàn tay tôi đã nắm lấy thứ nam tính của mình, vuốt ve lên xuống nhịp nhàng.[l][r]",
  "_　Một cảm xúc mãnh liệt đầy tội lỗi và trái luân thường đạo lý mà tôi chưa từng nếm trải bao giờ đang hoàn toàn chiếm trọn lấy tâm trí.[p]",
  "「Nhưng mà, nếu muốn tiếp tục chơi thì em nghĩ mình nên bàn bạc với anh hai trước thì hơn……」[l][r][r]",
  "_　Lúc này tôi chẳng còn bận tâm con bé đang nói những gì nữa. Chỉ là, mỗi khi hai từ 『Anh hai』 vang lên, thứ gì đó bên trong tôi lại vụn vỡ với tốc độ không thể cứu vãn.[p]",
  "「Vậy thì…… Em thực sự cảm ơn anh nhiều lắm ạ……! Chúc anh ngủ ngon nhé……」[l][r][r]",
  "_　Sau khi hình bóng nhân vật của em gái đăng xuất biến mất khỏi màn hình, vết nhơ tội lỗi trắng đục của tôi cũng bắn tung tóe nhớp nháp bám chặt lên mặt kính.[p]",
  "_　Dù đã giải tỏa dục vọng một lần, tay tôi vẫn không rời khỏi thứ đang dựng đứng ngạo nghễ kia.[l]Cảm giác tội lỗi với em gái, sự ghê tởm chính bản thân mình, tất cả lúc này lại như một liều thuốc phiện đầy ma lực cuốn tôi chìm sâu vào cơn nghiện loạn luân tội lỗi.[p]",
  "_　――Tôi muốn…… muốn được nghe giọng nói của em gái nhiều hơn nữa.[l][r][r]",
  "_　――Tôi muốn…… được thưởng thức cơ thể của em gái ở khoảng cách thật gần.[p]",
  "「Chào buổi sáng anh hai」[l][r][r]",
  "「A, đúng rồi, anh hai ơi, lát nữa em có chuyện này muốn hỏi ý anh một chút……」",
  "――Hãy để anh cảm nhận sâu sắc hơn nữa…… sắc màu [ruby text=\"giống cái\"]nữ tính[ruby text=\"của em\"] nơi em gái anh."
];
if (data['zenjitsu.ks']) {
  data['zenjitsu.ks'].forEach((entry, i) => {
    if (zenjitsu_trans[i]) entry.translated = zenjitsu_trans[i];
  });
}

// 8. main.ks & osawari.ks
if (data['main.ks'] && data['main.ks'][0]) {
  data['main.ks'][0].translated = data['main.ks'][0].raw;
}
if (data['osawari.ks'] && data['osawari.ks'][0]) {
  data['osawari.ks'][0].translated = data['osawari.ks'][0].raw;
}

fs.writeFileSync(extractFile, JSON.stringify(data, null, 2), 'utf8');
console.log('✅ Đã cập nhật xong scenario_extract.json với toàn bộ bản dịch tiếng Việt!');
