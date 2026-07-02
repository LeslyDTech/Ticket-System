import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ticket, TicketStatus } from '../../../models/ticket';

export interface TicketFormValue {
  title: string;
  priority: Ticket['priority'];
  status: TicketStatus;
}

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-form.html',
  styleUrl: './ticket-form.css',
})
export class TicketForm implements OnChanges {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() initial: TicketFormValue = { title: '', priority: 'Low', status: 'Open' };

  @Output() submitForm = new EventEmitter<TicketFormValue>();
  @Output() cancelForm = new EventEmitter<void>();

  title = '';
  priority: Ticket['priority'] = 'Low';
  status: TicketStatus = 'Open';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initial']) {
      this.title = this.initial.title;
      this.priority = this.initial.priority;
      this.status = this.initial.status;
    }
  }

  submit() {
    if (!this.title.trim()) return;
    this.submitForm.emit({ title: this.title, priority: this.priority, status: this.status });
    if (this.mode === 'create') {
      this.title = '';
      this.priority = 'Low';
    }
  }
}