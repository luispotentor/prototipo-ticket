<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTicketAdminRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'sometimes|required|exists:tickets,id',
            'ticket_type_id' => 'sometimes|required|exists:ticket_types,id',
            'user_id' => 'sometimes|required|exists:users,id',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'status' => 'sometimes|required|string|exists:ticket_statuses,id',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages():array
    {
        return [
            'id.required' => 'El ID del ticket es obligatorio.',
            'id.exists' => 'El ID del ticket seleccionado no es válido.',
            'ticket_type_id.required' => 'El tipo de ticket es obligatorio.',
            'ticket_type_id.exists' => 'El tipo de ticket seleccionado no es válido.',
            'user_id.required' => 'El usuario es obligatorio.',
            'user_id.exists' => 'El usuario seleccionado no es válido.',
            'title.required' => 'El título del ticket es obligatorio.',
            'title.string' => 'El título del ticket debe ser una cadena de caracteres.',
            'title.max' => 'El título del ticket no puede tener más de :max caracteres.',
            'description.required' => 'La descripción del ticket es obligatoria.',
            'description.string' => 'La descripción del ticket debe ser una cadena de caracteres.',
            'status.required' => 'El estado del ticket es obligatorio.',
            'status.string' => 'El estado del ticket debe ser una cadena de caracteres.',
            'status.exists' => 'El estado del ticket seleccionado no es válido.',
        ];
    }
}
