import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { PatchuserService } from '@app/services/patchuser.service';
import { AuthService } from '@app/services/auth.service';
import { User } from '@int/user';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  hobby = '';
  genders: string[] = ['Masculino', 'Femenino', 'Otros'];
  genderValue = '';
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  hobbyCtrl = new FormControl();
  filteredHobbies: Observable<string[]>;
  hobbies: string[] = [];
  allHobbies: string[] = [
    'Fútbol',
    'Tenis',
    'Videojuegos',
    'PlayStation 4',
    'PlayStation 5',
    'Viajar',
    'Caminar',
    'Fitness',
    'Among US',
    'Informática',
    'Progrmación',
    'Boxeo',
    'Kick Boxing',
    'Xbox',
    'Gaming',
    'Perros',
    'Gatos',
    'Caballos',
    'Hamsters',
    'Coches',
    'Motos',
    'Pintura',
    'Geografía',
    'Matemáticas',
    'Negocios',
    'StartUps',
  ];
  user: User;

  profileForm = this.formBuilder.group({
    email: [''],
    name: [''],
    password: [''],
  });

  userProfile = {
    email: this.profileForm.controls.email,
    emailChange: false,
    name: this.profileForm.controls.name,
    nameChange: false,
    genderChange: false,
    password: this.profileForm.controls.password,
    passwordChange: false,
    hobbyChange: false,
  };
  @ViewChild('hobbyInput') hobbyInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  constructor(
    private patchuserService: PatchuserService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.filteredHobbies = this.hobbyCtrl.valueChanges.pipe(
      startWith(null),
      map((hobby: string | null) =>
        hobby ? this._filter(hobby) : this.allHobbies.slice()
      )
    );
    this.user = JSON.parse(this.authService.setCurrentSession() || '{}');
  }
  public changeHobbies(): void {
    if (this.user) {
      this.patchuserService.editHobbies(this.user._id, this.hobbies);
      this.userProfile.hobbyChange = true;
      setTimeout(() => {
        this.userProfile.hobbyChange = false;
      }, 1500);
    } else {
      console.log(this.user);
    }
  }
  public changeName(): void {
    if (this.user) {
      this.patchuserService.editName(
        this.user._id,
        this.userProfile.name.value
      );
      this.userProfile.nameChange = true;
      setTimeout(() => {
        this.userProfile.nameChange = false;
      }, 1500);
      this.profileForm.controls.name.setValue('');
    } else {
      console.log(this.user);
    }
  }
  public changeGender(): void {
    if (this.user) {
      this.patchuserService.editGender(this.user._id, this.genderValue);
      this.userProfile.genderChange = true;
      setTimeout(() => {
        this.userProfile.genderChange = false;
      }, 1500);
      this.genderValue = '';
    } else {
      console.log(this.user);
    }
  }
  public changeEmail(): void {
    if (this.user) {
      this.patchuserService.editEmail(
        this.user._id,
        this.userProfile.email.value
      );
      this.userProfile.emailChange = true;
      setTimeout(() => {
        this.userProfile.emailChange = false;
      }, 1500);
      this.profileForm.controls.email.setValue('');
    } else {
      console.log(this.user);
    }
  }
  public changePassword(): void {
    if (this.user) {
      this.patchuserService.editPassword(
        this.user._id,
        this.userProfile.password.value
      );
      this.userProfile.passwordChange = true;
      setTimeout(() => {
        this.userProfile.passwordChange = false;
      }, 1500);
      this.profileForm.controls.password.setValue('');
    } else {
      console.log(this.user);
    }
  }
  public changePersonal(name: string, gender: string): void {
    if (name.length > 1) {
      this.changeName();
    } else {
      console.log(this.user);
    }
    if (gender.length > 1) {
      this.changeGender();
    } else {
      console.log('error');
    }
  }
  public changeAccess(email: string, password: string): void {
    if (email.length > 1) {
      this.changeEmail();
    } else {
      console.log(this.user);
    }
    if (password.length > 1) {
      this.changePassword();
    } else {
      console.log('error');
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.hobbies.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.hobbyCtrl.setValue(null);
  }

  remove(hobby: string): void {
    const index = this.hobbies.indexOf(hobby);

    if (index >= 0) {
      this.hobbies.splice(index, 1);
      this.changeHobbies();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.hobbies.push(event.option.viewValue);
    this.hobbyInput.nativeElement.value = '';
    this.hobbyCtrl.setValue(null);
    this.changeHobbies();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allHobbies.filter(
      (hobby) => hobby.toLowerCase().indexOf(filterValue) === 0
    );
  }
  ngOnInit(): void {
    this.hobbies = this.user.hobbies;
  }
}
