import uuid
from autoslug import AutoSlugField
from django.urls import reverse
from django.db import models
from django.core.validators import (
    MinValueValidator,
    MaxValueValidator,
)
from django.contrib.auth.models import User


class UserProfile(models.Model):
    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user}'s profile"


class ToolSession(models.Model):
    class Meta:
        verbose_name = "Tool Session"
        verbose_name_plural = "Tool Sessions"

    slug = AutoSlugField(populate_from='session_name', unique=True)
    session_name = models.CharField(max_length=50)
    creation_date = models.DateField(auto_now_add=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session_owner = models.ForeignKey(UserProfile,
                                      on_delete=models.CASCADE,
                                      null=True)

    def get_absolute_url(self):
        return reverse("tool_session_detail", kwargs={"slug": self.slug})

    def __str__(self):
        return f"{self.session_name}"


class HpTracker(models.Model):
    class Meta:
        verbose_name = "HP Tracker"
        verbose_name_plural = "HP Trackers"

    title = models.CharField(max_length=40)
    hp_value = models.SmallIntegerField(
        validators=[MinValueValidator(limit_value=-1000),
                    MaxValueValidator(limit_value=1000)],
        default=0,
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tool_session = models.ForeignKey(ToolSession,
                                     related_name='hp_tracker',
                                     on_delete=models.CASCADE,
                                     null=True
                                     )

    def __str__(self):
        return f"{self.title}, HP: {self.hp_value}"


