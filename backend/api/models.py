from django.db import models

class Employee(models.Model):

    emp_id=models.CharField(max_length=20)

    name=models.CharField(max_length=100)

    designation=models.CharField(max_length=100)

    phone=models.CharField(max_length=20)

    email=models.EmailField()

    instagram=models.CharField(max_length=100)

    website=models.CharField(max_length=100)

    profile=models.ImageField(upload_to="profile/")

    qr_code=models.ImageField(upload_to="qr/",blank=True,null=True)

    def __str__(self):
        return self.name