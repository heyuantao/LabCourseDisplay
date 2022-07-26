from rest_framework.views import exception_handler
from django.urls import reverse

def rest_framework_custion_exception_handler(exc,context):
    response = exception_handler(exc,context)
    if (response is not None) and ( response.data is not None):
        if response.status_code>=400:
            detail_string = response.data.get('detail','')
            response.data['error_message'] = detail_string
            #response.data['redirect_url'] = reverse("guest_home_page")
        if response.status_code==302:
            pass
    return response
