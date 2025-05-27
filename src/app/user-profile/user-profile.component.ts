import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/User';
import { Profile } from '../../models/Profile';
import { ProfileService } from '../../services/ProfileServic.service';
import { UserService } from '../user-roles-yousef/services/User';
import { AuthService } from '../user-roles-yousef/services/AuthService';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, NgFor, RouterModule, NgIf, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isEditMode: boolean = false;
  isCollapsed = false;

  currentUser: User | null = null;
  selectedFile: File | null = null;

  editFirstName: string = '';
  editLastName: string = '';
  editUsername: string = '';
  editPhone: string = '';
  editEmail: string = '';
  editCity: string = '';
  editCountry: string = '';
  editBio: string = '';
  editSkills: string = '';
  editWhatsapp: string = '';
  editInstagram: string = '';
  editFacebook: string = '';

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getCurrentUserProfile();
  }

  getCurrentUserProfile(): void {

    this.authService.getUser().subscribe(
      (user: User) => {
        this.currentUser = user;
        this.initializeEditFields();
        console.log('Current User Profile:', this.currentUser);
      },
      error => {
        console.error('Error fetching current user profile:', error);
        this.router.navigate(['/login']);
      }
    );
  }

  initializeEditFields(): void {
    if (this.currentUser) {
      this.editFirstName = this.currentUser.firstname || '';
      this.editLastName = this.currentUser.lastname || '';
      this.editUsername = this.currentUser.username || '';
      this.editPhone = this.currentUser.phone || '';
      this.editEmail = this.currentUser.email || '';
      this.editCity = this.currentUser.city || '';
      this.editCountry = this.currentUser.country || '';

      if (this.currentUser.profile) {
        this.editBio = this.currentUser.profile.bio || '';
        this.editSkills = this.currentUser.profile.skills || '';
        this.editWhatsapp = this.currentUser.profile.whatsappNumber || '';
        this.editInstagram = this.currentUser.profile.InstagramLink || '';
        this.editFacebook = this.currentUser.profile.FacebookLink || '';
      } else {
        this.currentUser.profile = {} as Profile;
        this.editBio = '';
        this.editSkills = '';
        this.editWhatsapp = '';
        this.editInstagram = '';
        this.editFacebook = '';
      }
    }
  }

  toggleEdit(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.initializeEditFields();
    }
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && this.currentUser?.id) {
      this.selectedFile = file;
      this.uploadProfilePhoto();
    } else {
      console.warn('No file selected or user ID is missing for photo update.');
    }
  }

  uploadProfilePhoto(): void {
    if (this.selectedFile && this.currentUser?.id) {
      this.profileService.updateProfilePhoto(this.currentUser.id, this.selectedFile).subscribe(
        response => {
          console.log('Profile photo updated successfully:', response);
          alert('Profile photo updated successfully!');
          this.getCurrentUserProfile();
          this.selectedFile = null;
        },
        error => {
          console.error('Error updating profile photo:', error);
          alert('Failed to update profile photo.');
          this.selectedFile = null;
        }
      );
    }
  }

  saveChanges(): void {
    if (!this.currentUser || !this.currentUser.id) {
      console.warn('No current user to save changes for or user ID is missing.');
      return;
    }

    const userId = this.currentUser.id;

    const hasUserChanges =
      this.editFirstName !== (this.currentUser.firstname || '') ||
      this.editLastName !== (this.currentUser.lastname || '') ||
      this.editUsername !== (this.currentUser.username || '') ||
      this.editPhone !== (this.currentUser.phone || '') ||
      this.editEmail !== (this.currentUser.email || '') ||
      this.editCity !== (this.currentUser.city || '') ||
      this.editCountry !== (this.currentUser.country || '');

    if (hasUserChanges) {
      const userUpdateData = {
        firstname: this.editFirstName,
        lastname: this.editLastName,
        username: this.editUsername,
        email: this.editEmail,
        phone: this.editPhone,
        city: this.editCity,
        country: this.editCountry,
      };

      this.userService.updateUser(userId, userUpdateData).subscribe(
        userResponse => {
          console.log('User basic info updated successfully:', userResponse);
          alert('User basic information updated!');
          this.getCurrentUserProfile();
        },
        userError => {
          console.error('Error updating user basic info:', userError);
          alert('Failed to update user basic information.');
        }
      );
    }


    if (this.editBio !== (this.currentUser.profile?.bio || '')) {
      this.profileService.updateProfileBio(userId, this.editBio).subscribe(
        bioResponse => {
          console.log('Bio updated successfully:', bioResponse);
          alert('Bio updated successfully!');
          this.getCurrentUserProfile();
        },
        bioError => {
          console.error('Error updating bio:', bioError);
          alert('Failed to update bio.');
        }
      );
    }


    if (this.editSkills !== (this.currentUser.profile?.skills || '')) {
      this.profileService.updateProfileSkills(userId, this.editSkills).subscribe(
        skillsResponse => {
          console.log('Skills updated successfully:', skillsResponse);
          alert('Skills updated successfully!');
          this.getCurrentUserProfile();
        },
        skillsError => {
          console.error('Error updating skills:', skillsError);
          alert('Failed to update skills.');
        }
      );
    }

    const currentWhatsapp = this.currentUser.profile?.whatsappNumber || '';
    const currentInstagram = this.currentUser.profile?.InstagramLink || '';
    const currentFacebook = this.currentUser.profile?.FacebookLink || '';

    const hasSocialLinkChanges =
      this.editWhatsapp !== currentWhatsapp ||
      this.editInstagram !== currentInstagram ||
      this.editFacebook !== currentFacebook;

    if (hasSocialLinkChanges) {
      this.profileService.updateProfileSocialLinks(
        userId,
        this.editWhatsapp,
        this.editInstagram,
        this.editFacebook
      ).subscribe(
        socialResponse => {
          console.log('Social links updated successfully:', socialResponse);
          alert('Social links updated successfully!');
          this.getCurrentUserProfile();
        },
        socialError => {
          console.error('Error updating social links:', socialError);
          alert('Failed to update social links.');
        }
      );
    }

    this.isEditMode = false;
  }

  deleteAccount(): void {
    if (confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.')) {
      if (this.currentUser?.id) {
        this.userService.deleteUser(this.currentUser.id).subscribe(
          response => {
            console.log('Account deleted successfully:', response);
            alert('Your account has been deleted.');
            this.authService.logout().subscribe(() => {
              this.router.navigate(['/login']);
            });
          },
          error => {
            console.error('Error deleting account:', error);
            alert('Failed to delete account.');
          }
        );
      } else {
        console.warn('No user ID found for account deletion.');
      }
    }
  }

  get skillsArray(): string[] {
    return this.currentUser?.profile?.skills
      ? this.currentUser.profile.skills.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
      : [];
  }
}
