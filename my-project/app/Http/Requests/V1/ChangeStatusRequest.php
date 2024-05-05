<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class ChangeStatusRequest extends FormRequest
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
            'id' => 'required|exists:tickets,id',
            'ticket_status_id' => 'required|string|exists:ticket_statuses,id',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'id.required' => 'El ID del ticket es obligatorio.',
            'id.exists' => 'El ID del ticket seleccionado no es válido.',
            'ticket_status_id.required' => 'El estado del ticket es obligatorio.',
            'ticket_status_id.string' => 'El estado del ticket debe ser una cadena de caracteres.',
            'ticket_status_id.exists' => 'El estado del ticket seleccionado no es válido.',
        ];
    }
}
