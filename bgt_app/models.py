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

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = AutoSlugField(populate_from='session_name', unique=True)
    session_name = models.CharField(max_length=50)
    creation_date = models.DateField(auto_now_add=True)
    session_owner = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        null=True
    )

    def get_absolute_url(self):
        return reverse("tool_session_detail", kwargs={"slug": self.slug})

    def __str__(self):
        return f"{self.session_name}"


class HpTracker(models.Model):
    class Meta:
        verbose_name = "HP Tracker"
        verbose_name_plural = "HP Trackers"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=40)
    hp_value = models.SmallIntegerField(
        validators=[MinValueValidator(limit_value=-1000),
                    MaxValueValidator(limit_value=1000)],
        default=0,
    )
    tool_session = models.ForeignKey(ToolSession,
                                     related_name='hp_tracker',
                                     on_delete=models.CASCADE,
                                     null=True
                                     )

    def __str__(self):
        return f"Title: {self.title} HP: {self.hp_value}"


class DieGroup(models.Model):
    class Meta:
        verbose_name = "Dice Group"
        verbose_name_plural = "Die Groups"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=40)
    tool_session = models.ForeignKey(
        ToolSession,
        related_name='die_group',
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return f"{self.title}"


class DieStandard(models.Model):
    class Meta:
        verbose_name = "Standard Die"
        verbose_name_plural = "Standard Dice"
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    num_sides = models.SmallIntegerField(
        default=6,
        validators=[MinValueValidator(limit_value=2),
                    MaxValueValidator(limit_value=100)],
    )
    rolled_value = models.SmallIntegerField(default=0)
    die_group = models.ForeignKey(
        DieGroup,
        related_name='standard_dice',
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return f"D:{self.num_sides}"


class ResourceGroup(models.Model):
    class Meta:
        verbose_name = "Resource Group"
        verbose_name_plural = "Resource Groups"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=40)
    tool_session = models.ForeignKey(
        ToolSession,
        related_name='resource_groups',
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return f"{self.title}"


class Resource(models.Model):
    class Meta:
        verbose_name = "Resource"
        verbose_name_plural = "Resources"
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=40)
    quantity = models.SmallIntegerField(default=0)
    production_available = models.BooleanField(default=False)
    production_modifier = models.SmallIntegerField(default=0)
    resource_group = models.ForeignKey(
        ResourceGroup,
        related_name='resources',
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return f'Resource: {self.name}'



