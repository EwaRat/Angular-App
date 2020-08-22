import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; /*przechowyuje info o trasie do naszej instancji */
import { Location } from '@angular/common'; /* serwis sluzacy do interakcji z przegladarka, zeby porworic do poprzedniej str np */

import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: [ './student-edit.component.css' ]
})
export class StudentEditComponent implements OnInit {
  student: Student;

  constructor(                     /* wszystkie 3 importy wstrzykniete do konstruktora czyli mozemy korzystac z nich poprzes this. */
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    // Uzyskanie wartości parametru "id" i jego konwersja na liczbę
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id)
      .subscribe(student => this.student = student);
  }

  goBack(): void {   /* cofnij sie wstecz - przegladarka */
    this.location.back();
  }

  save(): void {
    // Zapisuje dane i przekierowuje do poprzedniego widoku
    this.studentService.updateStudent(this.student)
      .subscribe(() => this.goBack());
  }
}
