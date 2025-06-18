import { Component, OnInit, HostListener } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../../services/ChatService.service';
import { Message, MessageWithMeta } from '../../../../models/message';
import { User } from '../../../../models/User';
import { ActivatedRoute } from '@angular/router';//عشان اقرا معلومات معينة من ال url مثل هون ل freelancerid
import { UserService } from '../../../user-roles-yousef/services/User';//عشان نجيب تفاصيل المستخدمين في حال مكانوش ضمن ال recent contnts

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgClass, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  //المتغيرات اللي بنستخدمها في الكومبوننت
  newMessage = '';//بدنا نحط فيها محتوى الرسالة الجديدة اللي بدنا نرسلها في حقل الرسالة
  messages: MessageWithMeta[] = [];//مصفوفة لتخزين الرسائل المعروضة في الشات مع معلومات إضافية مثل من أرسلها وأي صورة افتراضية نستخدمها
  recentContacts: User[] = [];// بنخزن فيها قائمة جهات الاتصال الأخيرة اللي ظهرت في الشريط الجانبي من نوع يوزر
  currentChatId: number | null = null; // المعرف الحالي للدردشة المفتوحة حاليا ونفسه ال currentReceiverId

  currentOwnerName = '';//اسم الشخص الي فاتح معاه محادثة حاليا
  currentReceiverId = 0;//الشخص الي برسله رسائل حاليا

  currentUserId = Number(localStorage.getItem('userId') || '0');//المستخدم الحالي الي عامل  تسجيل دخول، بنخزن فيه ال id تبعه من ال localStorage
  //ليش بنجيبه من ال localstoragee ?
  //  لأنه بيكون تم تخزينه بعد تسجيل الدخول، وبنحتاجه عشان نعرف إذا الرسالة المرسلة هي من المستخدم الحالي "me" أو من الطرف الآخر "other
  sidebarOpen = true;// حالة الشريط الجانبي، مفتوح أو مغلق
  isMobile = false;// حالة الشاشة، إذا كانت موبايل أو لابتوب
//هون بتبلش عملية ال dependency injection، بنعطي الكومبوننت الخدمات اللي بدها تستخدمها
  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
// هذه الدالة بتشتغل أول ما الـ Component يشتغل ويتم تهيئته. هنا بيتم جلب البيانات الأولية وتهيئة حالة الشات.
  ngOnInit(): void {
    const routeFreelancerId = this.route.snapshot.paramMap.get('freelancerId'); //1 //هون بنجيب ال freelancerId من ال URL باستخدام ActivatedRoute عشان لو اجى المستخدم كبس على شات معينة في صفحة ما ينبعت ال id تيعة في ال عقم
    // إذا كان ال userId موجود في ال URL، بنستخدمه لفتح الشات مباشرة مع هذا الشخص
    this.chatService.getRecentContacts().subscribe((data) => {//2 // بنطلب من chatService قائمة جهات الاتصال الأخيرة
      // التي تم حفظها في قاعدة البيانات، ونعرضها في الشريط الجانبي
      this.recentContacts = data;//3 //هنا بنجيب قائمة جهات الاتصال الأخيرة من خدمة الشات

      if (routeFreelancerId) {//4// اذا كان في id معين في ال URL، بنحاول نفتح الشات مع هذا الشخص مباشرة
        const freelancerIdNum = Number(routeFreelancerId);//لانه ال id بناخذو من ال URL بيجي على شكل string، لازم نحوله لرقم عشان نقدر نستخدمه في عمليات المقارنة
        const existingContact = this.recentContacts.find(contact => contact.id === freelancerIdNum);//بدي أشيك إذا كان هذا الشخص موجود في قائمة جهات الاتصال الأخيرة
        //إذا كان موجود، بنفتح الشات معه مباشرة
        //إذا ما كان موجود، بنطلب تفاصيله من السيرفر ونضيفه لقائمة جهات الاتصال الأخيرة

        if (existingContact) {//5
          this.openChat(freelancerIdNum);
        } else {//6

          this.userService.getUser(freelancerIdNum).subscribe({ //بستنا معلومات المستخدم توصل وبس توصل بضيف هاد المستخدم على قائمة ال recent contct
            next: (user: User) => {
              this.recentContacts.unshift(user); // unshift لإضافة المستخدم في بداية القائمة
              this.openChat(user.id);
            },
            error: (err) => {
              console.error('Error fetching freelancer details:', err);
              if (data.length > 0) {
                this.openChat(data[0].id);
              } else {
                console.log('No recent contacts or specific chat ID found for user:', this.currentUserId);
              }
            }
          });
        }
      } //لهون بتخلص ال if (routeFreelancerId) {//4 واخر شرطين لحتى اذا كان في يوزرايدي بال url بس صار خلل بجلب بينات المستخدم لسفتح معه شات
      else if (data.length > 0) {//7 // لكن هون برا ال if (routefreelancerid) عشان لو ما كان في id معين في ال URL، بنفتح الشات مع أول جهة اتصال من قائمة جهات الاتصال الأخيرة
        this.openChat(data[0].id);
      } else {//8
        console.log('No recent contacts or specific chat ID found for user:', this.currentUserId);
      }
    });

    this.checkScreenSize();//9 بيفحص حجم الشاشة بهاي الدالة عشان يعرف يسكر ولا يفتح ال  sidebar
  }
// هاد decorator بيسمح لنا نسمع حدث تغيير حجم النافذة، وبناءً عليه بنحدث حالة الشريط الجانبي وحالة الشاشة
  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;//  // إذا كان عرض النافذة أقل من أو يساوي 768 بكسل، نعتبرها شاشة موبايل
    // إذا كانت الشاشة موبايل، نغلق الشريط الجانبي، وإذا كانت لابتوب أو شاشة أكبر، نفتح الشريط الجانبي
    this.sidebarOpen = !this.isMobile;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
//لفتح محادثة مع شخص معين وعرض رسائله
  openChat(receiverId: string | number) {
    const id = Number(receiverId);
    if (isNaN(id) || id <= 0) {
      console.warn('Invalid receiverId:', receiverId);
      return;
    }

    this.currentReceiverId = id;
    this.currentChatId = id;

    const owner = this.recentContacts.find(user => user.id === id);
    this.currentOwnerName = owner?.username || 'Unknown User';

    this.chatService.getChatMessagesById(id).subscribe((msgs: Message[]) => {
      this.messages = msgs.map(msg => ({
        ...msg,
        from: msg.sender_id === this.currentUserId ? 'me' : 'other',
        avatar: msg.sender_id !== this.currentUserId
                  ? (msg.sender?.profile?.User_photo || 'assets/default.jpg')
                  : ''
      })) as MessageWithMeta[];
      setTimeout(() => this.scrollToBottom(), 100);
    });

    if (this.isMobile) {
      this.sidebarOpen = false;
    }
  }

  sendMessage() {
    if (!this.currentReceiverId || this.currentReceiverId === 0) {
      alert('Please select a chat to send a message.');
      return;
    }

    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.currentReceiverId, this.newMessage).subscribe({
        next: (sentMessage: Message) => {
          const msg: MessageWithMeta = {
            ...sentMessage,
            from: 'me',
            avatar: ''
          };
          this.messages.push(msg);
          this.newMessage = '';
          setTimeout(() => this.scrollToBottom(), 100);
        },
        error: err => {
          console.error('Error sending message:', err);
        }
      });
    }
  }

  scrollToBottom() {
    const container = document.querySelector('.chat-messages');
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }
}
