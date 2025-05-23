
import { Component, OnInit } from '@angular/core';
import confetti from 'canvas-confetti';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-memory-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './memory-page.component.html',
  styleUrls: ['./memory-page.component.scss']
})
export class MemoryPageComponent implements OnInit {
  showBirthday = true;

  // Photo Gallery
  photos: string[] = [];
  
  // Personal Dates
  myBirthday = new Date(2000, 4, 22); // May 22 2000 (months are 0-indexed)
  hisBirthday = new Date(1998, 4, 18); // May 18 1998
  loveStartDate = new Date(2024, 6, 18); // July 18 2024

  // Calculated Values
  myAge = this.calculateAge(this.myBirthday);
  hisAge = this.calculateAge(this.hisBirthday);
  daysTogether = this.calculateDaysTogether();
  
  // Envelope
  envelopeOpen = false;
  
  // Music Player
  isPlaying = true;
  musicProgress = 0;
  currentSong = 0;
  songs = [
    { name: "Perfect", artist: "Ed Sheeran" },
    { name: "All of Me", artist: "John Legend" },
    { name: "A Thousand Years", artist: "Christina Perri" }
  ];
  
  // Hearts Animation
  hearts = Array.from({ length: 30 }, () => ({
    left: Math.random() * 100,
    delay: Math.random() * 10
  }));

  // Bible Verses
  bibleVerses = [
    "Love is patient, love is kind. - 1 Corinthians 13:4",
    "Two are better than one. - Ecclesiastes 4:9",
    "I have found the one whom my soul loves. - Song of Solomon 3:4",
    "Let all that you do be done in love. - 1 Corinthians 16:14",
    "Love never fails. - 1 Corinthians 13:8"
  ];
  currentVerse = this.bibleVerses[0];

  ngOnInit(): void {
    this.loadPhotos();
      console.log('Loaded photos:', this.photos);
    this.playIntro();
    setInterval(() => this.launchConfetti(), 8000);
    setInterval(() => this.updateMusicProgress(), 1000);
    setInterval(() => this.rotateBibleVerse(), 15000);
    
  }
  playIntro() {
    setTimeout(() => {
      this.launchConfetti();
    }, 500);
    setTimeout(() => {
      this.showBirthday = false;
      this.autoPlayBackgroundMusic();
    }, 3000); // hides after 3 seconds
  }
  getLoveDuration(): string {
    const start = this.loveStartDate;
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}, and ${days} day${days !== 1 ? 's' : ''}`;

  }
  

  // Photo Gallery Functions
  private loadPhotos() {
    const savedPhotos = localStorage.getItem('memoryPhotos');
    this.photos = savedPhotos ? JSON.parse(savedPhotos) : [
      'assets/images/image1.jpg',
      'assets/images/image2.jpg',
      'assets/images/image3.jpg',
      'assets/images/image4.jpg',
      'assets/images/image5.jpg',
      'assets/images/image6.jpg',
      'assets/images/image7.jpg',
      'assets/images/image8.jpg',
      'assets/images/image9.jpg',
      'assets/images/image10.jpg',
      'assets/images/image11.jpg',
      'assets/images/image12.jpg',
      'assets/images/image13.jpg',
      'assets/images/image14.jpg',
      'assets/images/image15.jpg',
      'assets/images/image1.jpg',
      'assets/images/image1.jpg',
      'assets/images/image1.jpg',
    ];
  }

  private savePhotos() {
    localStorage.setItem('memoryPhotos', JSON.stringify(this.photos));
  }

  uploadPhoto() {
    document.getElementById('fileInput')?.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (file.size > 5_000_000) {
        alert('Please select an image smaller than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photos.unshift(e.target.result);
        this.savePhotos();
        this.launchConfetti();
      };
      reader.readAsDataURL(file);
    }
  }

  deletePhoto(index: number) {
    if (confirm('Delete this memory?')) {
      this.photos.splice(index, 1);
      this.savePhotos();
    }
  }

  // Age Calculation Functions
  calculateAge(birthdate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    return age;
  }

  calculateDaysTogether(): number {
    const today = new Date();
    const diffTime = today.getTime() - this.loveStartDate.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  // Birthday Popup
  wishHappyBirthday() {
    setTimeout(() => {
      alert('🎉 Happy Birthday, Love! 🎂');
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
    }, 500);
  }

  // Background Music Autoplay
  audio: HTMLAudioElement | null = null;

autoPlayBackgroundMusic() {
  this.audio = new Audio('assets/music/song.mp3');
  this.audio.loop = true;
  this.audio.volume = 0.4;

  // Play after 3-second delay (post-birthday overlay)
  setTimeout(() => {
    this.audio?.play().catch(() => {
      console.warn("Autoplay blocked, trying again...");
      setTimeout(() => this.audio?.play(), 1000);
    });
  }, 3000);
}


  // Bible Verses for background
  bibleVersePattern = [
    "1 Cor. 13:4",
    "Eccl. 4:9",
    "Song 3:4",
    "1 Cor. 16:14",
    "1 Cor. 13:8"
  ];
  getBackgroundStyle() {
    const verse = this.bibleVersePattern[Math.floor(Math.random() * this.bibleVersePattern.length)];
    return {
      'background-image': `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='20' y='30' font-family='Arial' font-size='12' fill='%23b8325c' fill-opacity='0.08' transform='rotate(15 100,100)'%3E${verse}%3C/text%3E%3C/svg%3E")`,
      'background-repeat': 'repeat'
    };
  }

  // Bible Verse Functions
  rotateBibleVerse() {
    const currentIndex = this.bibleVerses.indexOf(this.currentVerse);
    const nextIndex = (currentIndex + 1) % this.bibleVerses.length;
    this.currentVerse = this.bibleVerses[nextIndex];
  }

  // Envelope Functions
  toggleEnvelope() {
    this.envelopeOpen = !this.envelopeOpen;
    if (this.envelopeOpen) {
      this.launchEnvelopeConfetti();
    }
  }

  // Music Player Functions
  togglePlay() {
    this.isPlaying = !this.isPlaying;
  }

  prevSong() {
    this.currentSong = (this.currentSong - 1 + this.songs.length) % this.songs.length;
    this.musicProgress = 0;
  }

  nextSong() {
    this.currentSong = (this.currentSong + 1) % this.songs.length;
    this.musicProgress = 0;
  }

  seekMusic() {
    console.log('Seeking to:', this.musicProgress);
  }

  updateMusicProgress() {
    if (this.isPlaying) {
      this.musicProgress = (this.musicProgress + 1) % 100;
    }
  }

  // Confetti Functions
  launchConfetti() {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  launchEnvelopeConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff6b6b', '#ff8e8e', '#ffb3b3', '#ffd8d8'],
    });
  }
}
