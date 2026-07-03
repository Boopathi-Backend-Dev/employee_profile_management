from django.shortcuts import render
import os
import qrcode

from django.conf import settings
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Employee
from .serializers import EmployeeSerializer

class EmployeeCreateView(APIView):

    def post(self, request):

        serializer = EmployeeSerializer(data=request.data)

        if serializer.is_valid():

            employee = serializer.save()

            url = f"https://employee-profile-management.vercel.app/employee/{employee.id}"

            qr = qrcode.make(qr_url)

            qr_folder = os.path.join(settings.MEDIA_ROOT, "qr")
            os.makedirs(qr_folder, exist_ok=True)

            qr_filename = f"{employee.id}.png"
            qr_path = os.path.join(qr_folder, qr_filename)

            qr.save(qr_path)

            employee.qr_code = f"qr/{qr_filename}"
            employee.save()

            return Response(EmployeeSerializer(employee).data, status=201)

        return Response(serializer.errors, status=400)


class EmployeeListView(APIView):

    def get(self, request):

        employees = Employee.objects.all().order_by("-id")

        serializer = EmployeeSerializer(employees, many=True)

        return Response(serializer.data)

class EmployeeDetailView(APIView):

    def get(self, request, pk):

        employee = get_object_or_404(Employee, pk=pk)

        serializer = EmployeeSerializer(employee)

        return Response(serializer.data)


class EmployeeUpdateView(APIView):

    def put(self, request, pk):

        employee = get_object_or_404(Employee, pk=pk)

        serializer = EmployeeSerializer(
            employee,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            qr_url = f"http://localhost:5173/employee/{employee.id}"

            qr = qrcode.make(qr_url)

            qr_folder = os.path.join(settings.MEDIA_ROOT, "qr")
            os.makedirs(qr_folder, exist_ok=True)

            qr_filename = f"{employee.id}.png"

            qr_path = os.path.join(qr_folder, qr_filename)

            qr.save(qr_path)

            employee.qr_code = f"qr/{qr_filename}"
            employee.save()

            return Response(EmployeeSerializer(employee).data)

        return Response(serializer.errors, status=400)


class EmployeeDeleteView(APIView):

    def delete(self, request, pk):

        employee = get_object_or_404(Employee, pk=pk)

        if employee.qr_code:
            qr_file = os.path.join(settings.MEDIA_ROOT, str(employee.qr_code))
            if os.path.exists(qr_file):
                os.remove(qr_file)

        if employee.profile:
            if os.path.exists(employee.profile.path):
                os.remove(employee.profile.path)

        employee.delete()

        return Response(
            {"message": "Employee Deleted Successfully"},
            status=204
        )